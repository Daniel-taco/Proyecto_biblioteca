<?php

namespace App\Http\Controllers;

use App\Models\Book_category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $book_categories = DB::table('book_categories')->get();
        return $book_categories;
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
        $category = Book_category::create([
            'category_name' => $request->category_name,
            'description' => $request->description,
        ]);
        $category->save();

        return $request;
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $category = Book_category::where('id', $request->id)->get();
        return $category;

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book_category $book_category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book_category $book_category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book_category $book_category)
    {
        //
    }
}
