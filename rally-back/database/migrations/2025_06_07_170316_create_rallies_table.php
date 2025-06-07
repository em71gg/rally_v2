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
        Schema::create('rallies', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('propietario_id')->nullable();
            $table->tinyInteger('validado')->default(0);//por defecto el rally no está validado.
            $table->string('nombre');
            $table->string('descripcion');
            $table->smallInteger('premio1')->nullable();
            $table->smallInteger('premio2')->nullable();
            $table->smallInteger('premio3')->nullable();
            $table->tinyInteger('limite_fotos');
            $table->tinyInteger('limite_votos');
            $table->datetime('fecha_inicio');
            $table->datetime('fecha_fin');
            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('propietario_id')->references('id')->on('users')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rallies');
    }
};
