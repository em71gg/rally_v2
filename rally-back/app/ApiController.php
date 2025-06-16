<?php

namespace App\Http\Controllers;

use App\Models\Foto;
use App\Models\Rally;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Resultado;
use App\Models\Voto;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;


class ApiController extends Controller
{
    # =========================================
    # Controllers: Rallies
    # =========================================

    /**
     * Crea un nuevo rally en la base de datos.
     * Valida los datos de entrada antes de guardar.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createRally(Request $request): JsonResponse
    {
        try {

            $request->validate([ //validaciones de datos entrantes
                'category_id' => 'required|integer',
                'propietario_id' => 'nullable|integer',

                'nombre' => 'required|string',
                'descripcion' => 'required|string',
                'premio1' => 'nullable|integer',
                'premio2' => 'nullable|integer',
                'premio3' => 'nullable|integer',
                'limite_votos' => 'required|integer|min:1|max:10',
                'limite_fotos' => 'required|integer',
                'fecha_inicio' => 'required|date_format:Y-m-d H:i:s',
                'fecha_fin' => 'required|date_format:Y-m-d H:i:s',
            ]);

            //Subir imagen a s3 y obtener la url.
            /*
            if ($request->hasFile('uri_cover')) {
                $file = $request->file('uri_cover');
                $path = Storage::disk('s3')->put('covers', $file);

                $url = Storage::url($path);
            } else {
                return response()->json(['Error' => 'No se envió imagen, debe enviar una.'], 400);
            }
                */
            //Crear rally.

            $rally = Rally::create([
                'category_id' => $request->input('category_id'),
                'propietario_id' => $request->input('propietario_id'),
                'nombre' => $request->input('nombre'),
                'descripcion' => $request->input('descripcion'),
                'premio1' => $request->input('premio1'),
                'premio2' => $request->input('premio2'),
                'premio3' => $request->input('premio3'),
                'limite_votos' => $request->input('limite_votos'),
                'limite_fotos' => $request->input('limite_fotos'),
                'fecha_fin' => $request->input('fecha_fin'),
                'fecha_inicio' => $request->input('fecha_inicio'),
                //'uri_cover' => $url,
            ]);

            return response()->json([
                'message' => 'Rally creado.',
                'data' => $rally
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al crear el rally',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * devuelve la información genérica de los rallies. Con  los datos de las tablas raally, category,
     * y user_rally a través de la realcion participantes
     */
    public function getRallies(): JsonResponse
    {
        try {
            $rallies = Rally::withCount('fotos')->with([
                'category:id,category',
                'propietario:id,name,nickname',
                'participantes:id',

            ])->get();

            return response()->json($rallies, 200);
        } catch (Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 500);
        }
    }

    public function registerUserOnRally(Request $request): JsonResponse
    {
        try {
            // Validar entrada
            $validated = $request->validate([
                'rally_id' => 'required|exists:rallies,id',
                'user_id' => 'required|exists:users,id',
            ]);
            $rally = Rally::findOrFail($validated['rally_id']);
            $userId = $validated['user_id'];

            // Evitar duplicados con syncWithoutDetaching
            $rally->participantes()->syncWithoutDetaching([$userId]);

            return response()->json([
                'message' => 'Usuario registrado correctamente en el rally.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al registrar usuario en el rally.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Valida un rally pasándole el ID por parámetro.
     */
    public function validateRally(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:rallies,id',
        ]);

        $rally = Rally::find($request->id);
        $rally->validado = 1;
        $rally->save();

        return response()->json([
            'message' => 'Rally validado correctamente.',
            'rally' => $rally
        ]);
    }

    /**
     * Elimina un rally pasándole el ID por parámetro.
     */
    public function deleteRally(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:rallies,id',
        ]);

        $rally = Rally::find($request->id);

        // Puedes hacer validaciones extra aquí, por ejemplo:
        // if ($rally->validado) return response()->json(...)

        $rally->delete();

        return response()->json([
            'message' => 'Rally eliminado correctamente.',
        ]);
    }

    # =========================================
    # Controllers: Photos
    # =========================================

    /**
     * Crea una foto en el modelo y aloja el archivo físico en supabase
     */

    /*
    ##################################
    #Con S3 y supabase
    ##################################


    public function createPhoto(Request $request): JsonResponse
    {
        try{
            $request->validate ([
                
                'user_id' => 'required|integer',
                'nombre' => 'required|string',
                'uri_cover' => 'required|image|max:20048',
            ]);
        
            //Subir imagen a s3 y obtener la url.
            if ($request->hasFile('uri_cover')) {
                $file = $request->file('uri_cover');
                $path = Storage::disk('s3')->put('photos', $file);
                if(!$path){
                    return response()->json(['Error' => 'Nose creo el archivo en supabase. No hay path']);
                }
                $url = Storage::url($path);
            } else {
                return response()->json(['Error' => 'No se envió imagen, debe enviar una.'], 400);
            }

            if($url) {
                $photo = Foto::create([
                'nombre' => $request->input('nombre'),
                'uri_imagen' => $url,//'http://www.fake.url', //
                'user_id' => $request->input('user_id'),
            ]);
            
            return response()->json([
                'message' => 'Foto alojada en le sistema.',
                'data' => $photo,
            ]);
            }
            else{
                return response()->json(['Error:' => 'La url n se ha generado']);
            }           
        
        }catch(Exception $e) {
             return response()->json([
                'message' => 'Error al crear una foto.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
     */
    ########################################
    #Con  API REST de Storage, usando Guzzle
    ########################################


    public function createPhoto(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'user_id' => 'required|integer',
                'nombre' => 'required|string',
                'uri_cover' => 'required|image|max:920048',
            ]);

            if (!$request->hasFile('uri_cover')) {
                return response()->json(['Error' => 'No se envió imagen, debe enviar una.'], 400);
            }

            $file = $request->file('uri_cover');
            $filename = uniqid() . '_' . $file->getClientOriginalName();

            $bucket = env('SUPABASE_BUCKET');
            $supabaseUrl = env('SUPABASE_URL');
            $apiKey = env('SUPABASE_API_KEY');

            // Construir URL para subir
            $uploadUrl = "$supabaseUrl/storage/v1/object/$bucket/$filename";

            // Subir archivo a Supabase Storage
            $response = Http::withToken($apiKey)
                ->attach(
                    'file',
                    file_get_contents($file->getRealPath()),
                    $filename
                )
                ->post($uploadUrl);

            if (!$response->successful()) {
                return response()->json([
                    'message' => 'Error al subir el archivo a Supabase.',
                    'error' => $response->json()
                ], 500);
            }

            // Construir URL pública
            $publicUrl = "$supabaseUrl/storage/v1/object/public/$bucket/$filename";

            $photo = Foto::create([
                'nombre' => $request->input('nombre'),
                'uri_imagen' => $publicUrl,
                'user_id' => $request->input('user_id'),
            ]);

            return response()->json([
                'message' => 'Foto alojada en Supabase correctamente.',
                'data' => $photo,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al crear una foto.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Asocia una foto a un rally 
     */
    public function submitPhotoToRally(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'rally_id' => 'required|exists:rallies,id',
            'foto_id' => 'required|exists:fotos,id',
        ]);

        $rally = Rally::findOrFail($validated['rally_id']);

        if (now()->greaterThanOrEqualTo(Carbon::parse($rally->fecha_inicio))) {
            return response()->json([
                'Message' => 'Nose puede asociar una foto cuando el rally ha comenzado'
            ], 403);
        }

        // Evita duplicados en la tabla intermedia
        $rally->fotos()->syncWithoutDetaching([$validated['foto_id']]);

        return response()->json([
            'message' => 'Foto presentada correctamente al rally.'
        ], 201);
    }

    /**
     * Retira una foto de un rallye
     */
    public function removePhotoRally(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'rally_id' => 'required|exists:rallies,id',
            'foto_id' => 'required|exists:fotos,id',
        ]);

        $rally = Rally::findOrFail($validated['rally_id']);

        // Validar fecha
        if (now()->greaterThanOrEqualTo(Carbon::parse($rally->fecha_inicio))) {
            return response()->json([
                'message' => 'No se puede retirar una foto cuando el rally ha comenzado.'
            ], 403);
        }

        $rally->fotos()->detach($validated['foto_id']);

        return response()->json([
            'message' => 'Foto retirada correctamente del rally.'
        ]);
    }


    /**
     * Devuelve todas las fotos asociadas a un rally específico.
     * La solicitud debe incluir el ID del rally, que será validado.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPhotosRally(Request $request): JsonResponse
    {

        $validated = $request->validate([
            'rally_id' => 'required|exists:rallies,id',
        ]);

        // Buscar el rally solicitado
        $rally = Rally::findOrFail($validated['rally_id']);

        // Obtener las fotos asociadas al rally, seleccionando solo los campos necesarios
        $fotos = $rally->fotos()->get(['id', 'user_id', 'uri_imagen', 'validada', 'nombre']);

        // Retornar los datos en formato JSON
        return response()->json([
            'rally_id' => $rally->id,
            'fotos' => $fotos,
        ], 200);
    }

    public function getPhotosRallyUser($rally_id, $user_id): JsonResponse
    {
        $rally = Rally::findOrFail($rally_id);

        $fotos = $rally->fotos('id', 'user_id', 'uri_imagen', 'validada')->where('user_id', $user_id)->get();
        return response()->json([
            'rally_id' => $rally->id,
            'fotos' => $fotos,
        ], 200);
    }



    ###################################################################################
    #Categorias 
    ###################################################################################

    public function getCategories(): JsonResponse
    {
        try {
            $categories = Category::get();
            return response()->json([
                'message' => 'Foto alojada en Supabase correctamente.',
                'data' => $categories,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al seleccionar las categorias.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    ###########################################################
    #votos
    ###########################################################

    public function vote(Request $request): JsonResponse
    {
        try {
            $request->validate([

                'ip'  => 'required|string',
                'foto_id' => 'required|exists:fotos,id',
                'rally_id' => 'required|exists:rallies,id',
                'calidad_tecnica' => 'required|integer',
                'calidad_artistica' => 'required|integer',
                'originalidad' => 'required|integer',
            ]);

            $voto = Voto::create([
                'ip' => $request->input('ip'),
                'foto_id' => $request->input('foto_id'),
                'rally_id' => $request->input('rally_id'),
                'calidad_tecnica' =>  $request->input('calidad_tecnica'),
                'calidad_artistica' =>  $request->input('calidad_artistica'),
                'originalidad' =>  $request->input('originalidad'),
            ]);

            $puntuacion = $request->input('calidad_tecnica') +
                $request->input('calidad_artistica') +
                $request->input('originalidad');

            $resultado = Resultado::firstOrNew([
                'rally_id' => $request->input('rally_id'),
                'foto_id' => $request->input('foto_id'),
            ]);

            $resultado->puntuacion = ($resultado->puntuacion ?? 0) + $puntuacion;
            $resultado->save();

            // Recalcular posiciones para todas las fotos en el mismo rally
            $resultados = Resultado::where('rally_id', $request->input('rally_id'))
                ->orderByDesc('puntuacion')
                ->get();

            foreach ($resultados as $index => $res) {
                $res->posicion = $index + 1;
                $res->save();
            }


            return response()->json([
                'message' => 'Votacion registrada y actualizados resultados',
                'data' => [
                    'voto' => $voto,
                    'resultado' => $resultado,
                ]
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al registrar el voto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getRallyResults($rally_id): JsonResponse
    {
        
        try {
            $resultados = Resultado::with('foto')
                ->where('rally_id', $rally_id)
                ->orderBy('posicion') // orden por posición ascendente
                ->get(['foto_id', 'puntuacion', 'posicion']); // columnas deseadas

            return response()->json([
                'message' => 'Resultados del rally.',
                'data' => $resultados
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al obtener los resultados.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getUserVotes(Request $request)
    {
        $validated = $request->validate([
            'rally_id' => 'required|exists:rallies,id',
            'ip' => 'required|string',
        ]);
        try {
            $votos = Voto::with('foto')
                ->where('rally_id', $validated['rally_id'])
                ->where('ip',$validated['ip'])
                ->get();
            return response()->json([
                'message' => 'Votaciones del usuario.',
                'data' => $votos,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al obtener los votos del usuario.',
                'error' => $e->getMessage(),
            ]);
        }
    }
}
