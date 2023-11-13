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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100)->unique();
            $table->string('author', 100);
            $table->string('isbn', 20)->unique();
            $table->integer('publication_year');
            $table->integer('available_copies');
            $table->unsignedBigInteger('id_category');
            $table->string('editorial', 100); 
            $table->string('edition', 50); 
            $table->timestamps();

            $table->foreign('id_category')->references('id')->on('book_categories')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
