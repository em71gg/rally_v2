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
        Schema::create('resultados', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->smallInteger('posicion');
            $table->unsignedBigInteger('rally_id');
            $table->unsignedBigInteger('foto_id');
            $table->foreign('rally_id')->references('id')->on('rallies');
            $table->foreign('foto_id')->references('id')->on('fotos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resultados');
    }
};
