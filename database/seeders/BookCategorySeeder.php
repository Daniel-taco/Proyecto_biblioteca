<?php

namespace Database\Seeders;

use App\Models\Book_category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $book_category = new Book_category();
        $book_category->category_name = 'Ciencia Ficción';
        $book_category->description = 'Viaja a mundos futuristas y explora lo inexplorado en estas intrigantes historias llenas de tecnología avanzada y aventuras intergalácticas.';
        $book_category->save();

        $book_category = new Book_category();
        $book_category->category_name = 'Misterio y Suspenso';
        $book_category->description = 'Mantén tus sentidos alerta con historias llenas de enigmas sin resolver y giros inesperados que mantendrán tu mente en vilo.';
        $book_category->save();

        $book_category = new Book_category();
        $book_category->category_name = 'Ciencia y Tecnología';
        $book_category->description = 'Explora los avances científicos y tecnológicos más recientes a través de libros que desmitifican conceptos complejos y fomentan la curiosidad.';
        $book_category->save();

        $book_category = new Book_category();
        $book_category->category_name = 'Romance';
        $book_category->description = 'Sumérgete en historias de amor apasionado y relaciones complicadas que te harán suspirar.';
        $book_category->save();

        $book_category = new Book_category();
        $book_category->category_name = 'Fantasía';
        $book_category->description = 'Escapa a mundos mágicos y llenos de maravillas, donde los límites de la realidad se desdibujan.';
        $book_category->save();
    }
}
