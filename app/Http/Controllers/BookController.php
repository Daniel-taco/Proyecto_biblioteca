<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = DB::table('books')->get();
        return $books;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $book = Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'isbn' => $request->isbn,
            'genre' => $request->genre,
            'publication_year' => $request->publication_year,
            'available_copies' => $request->available_copies,
            'id_category' => $request->id_category,
            'editorial' => $request->editorial,
            'edition' => $request->edition
        ]);
        $book->save();

        return $request;
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $book = Book::where('id', $request->id)
            ->orwhere('author', $request->author)
            ->orwhere('isbn', $request->isbn)
            ->orwhere('genre', $request->genre)
            ->orwhere('publication_year', $request->publication_year)
            ->orwhere('id_category', $request->id_category)
            ->orwhere('editorial', $request->editorial)
            ->orwhere('edition', $request->edition)
            ->get();
        return $book;

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        //
    }
}
