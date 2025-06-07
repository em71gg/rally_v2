<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('votos', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('ip'); // Votante anónimo identificado por IP
            $table->foreignId('foto_id')->constrained()->on('fotos')->onDelete('cascade');
            $table->foreignId('rally_id')->constrained()->on('rallies')->onDelete('cascade');

            $table->tinyInteger('calidad_tecnica');
            $table->tinyInteger('calidad_artistica');
            $table->tinyInteger('originalidad');

            $table->unique(['ip', 'foto_id', 'rally_id']); // Prevenir votos múltiples de una IP para la misma foto en un rally
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votos');
    }
};
