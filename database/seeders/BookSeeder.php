<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $book = new Book();
        $book->title = 'Titanic';
        $book->author = 'Walter Lord';
        $book->isbn = '963258741';
        $book->publication_year = '1976';
        $book->available_copies = '200';
        $book->id_category = 2;
        $book->editorial = 'Acantilado';
        $book->edition = '1';
        $book->save();

        $book = new Book();
        $book->title = 'Cenicienta';
        $book->author = 'Charles Perrault';
        $book->isbn = '789654123';
        $book->publication_year = '1932';
        $book->available_copies = '20';
        $book->id_category = 6;
        $book->editorial = 'Anagrama';
        $book->edition = '6';
        $book->save();

        $book = new Book();
        $book->title = 'La Balla Durmiente';
        $book->author = 'Charles Perrault';
        $book->isbn = '159786349';
        $book->publication_year = '1912';
        $book->available_copies = '15';
        $book->id_category = 6;
        $book->editorial = 'Anagrama';
        $book->edition = '3';
        $book->save();
    }
}
