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
        $query = Book::query();

    if ($request->has('title')) {
        $query->where('title', 'like', '%' . $request->input('title') . '%');
    }

    if ($request->has('author')) {
        $query->where('author', 'like', '%' . $request->input('author') . '%');
    }

    if ($request->has('isbn')) {
        $query->where('isbn', $request->input('isbn'));
    }

    if ($request->has('genre')) {
        $query->where('genre', 'like', '%' . $request->input('genre') . '%');
    }

    if ($request->has('publication_year')) {
        $query->where('publication_year', $request->input('publication_year'));
    }

    if ($request->has('id_category')) {
        $query->where('id_category', $request->input('id_category'));
    }

    if ($request->has('editorial')) {
        $query->where('editorial', 'like', '%' . $request->input('editorial') . '%');
    }

    if ($request->has('edition')) {
        $query->where('edition', 'like', '%' . $request->input('edition') . '%');
    }

    $books = $query->get();

    return response()->json(['books' => $books], 200);

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
        $book = Book::where('id', $request->id)->first();

        $book->update([
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
        return $book;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $book = Book::where('id', $request->id)->delete();
        return $book;
    }
}
