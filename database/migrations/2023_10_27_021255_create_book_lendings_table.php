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
        Schema::create('book_lendings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_lend');
            $table->unsignedBigInteger('id_book');
            $table->timestamps();

            $table->foreign('id_lend')->references('id')->on('lends')->onDelete('cascade');
            $table->foreign('id_book')->references('id')->on('books')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_lendings');
    }
};
