<?php

namespace App\Http\Controllers;

use App\Models\Book_lending;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookLendingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $book_lendings = DB::table('book_lendings')->get();
        return $book_lendings;
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
        $book_lending = Book_lending::create([
            'id_lend' => $request->id_lend,
            'id_book' => $request->id_book
        ]);
        $book_lending->save();

        return $request;
    }

    /**
     * Display the specified resource.
     */
    public function show(Book_lending $book_lending)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book_lending $book_lending)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book_lending $book_lending)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book_lending $book_lending)
    {
        //
    }
}
