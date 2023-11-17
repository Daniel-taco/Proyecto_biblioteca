<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Book_lending;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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

        if (Book::where('title', $request->title)->exists() && Book::where('edition', $request->edition)->exists()) {
            return response()->json(['error' => 'The book already exists.'], 422);
        }
        if (Book::where('isbn', $request->isbn)->exists()) {
            return response()->json(['error' => 'The ISBN already exists.'], 422);
        }

        $rules = [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|max:20',
            'publication_year' => 'required|integer|max:' . date('Y'),
            'available_copies' => 'required|integer|min:0',
            'id_category' => 'required|exists:book_categories,id',
            'editorial' => 'required|string|max:255',
            'edition' => 'required|string|max:255',
        ];

        
        $validator = Validator::make($request->all(), $rules); 
        
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        

        $book = Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'isbn' => $request->isbn,
            'publication_year' => $request->publication_year,
            'available_copies' => $request->available_copies,
            'id_category' => $request->id_category,
            'editorial' => $request->editorial,
            'edition' => $request->edition
        ]);
        return response()->json(['message' => 'Success created book'], 201);
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
        $rules = [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|max:20',
            'publication_year' => 'required|integer|max:' . date('Y'),
            'available_copies' => 'required|integer|min:0',
            'id_category' => 'required|exists:book_categories,id',
            'editorial' => 'required|string|max:255',
            'edition' => 'required|string|max:255',
        ];
    
        $validator = Validator::make($request->all(), $rules);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
    
        $book = Book::where('id', $request->id)->first();
    
        $book->update([
            'title' => $request->title,
            'author' => $request->author,
            'isbn' => $request->isbn,
            'publication_year' => $request->publication_year,
            'available_copies' => $request->available_copies,
            'id_category' => $request->id_category,
            'editorial' => $request->editorial,
            'edition' => $request->edition
        ]);
    
        return $book;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $bookLendingsCount = Book_lending::where('id_book', $request->id)->count();

    if ($bookLendingsCount > 0) {
        return response()->json(['error' => 'Cannot delete book with associated lendings.'], 400);
    }
    $book = Book::find($request->id);

    if (!$book) {
        return response()->json(['error' => 'Book not found.'], 404);
    }

    $book->delete();

    return response()->json(['message' => 'Book deleted successfully.']);
    }
    public function decrementCopies($id)
    {
        $book = Book::find($id);

        if ($book) {
            $book->decrement('available_copies');
            return response()->json(['message' => 'Available_copies field decremented successfully'], 200);
        }

        return response()->json(['error' => 'Book not found'], 404);
    }
    public function bookIncrementCopies($id)
    {
        $book = Book::find($id);

        if ($book) {
            $book->increment('available_copies');
            return response()->json(['message' => 'Available_copies field incremented successfully'], 200);
        }

        return response()->json(['error' => 'Book not found'], 404);
    }
}
