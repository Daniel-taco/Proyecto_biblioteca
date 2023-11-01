<?php

namespace App\Http\Controllers;

use App\Models\Lend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LendController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lends = DB::table('lends')->get();
        return $lends;
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
        $lend = Lend::create([
            'id_lend' => $request->id_lend,
            'id_book' => $request->id_book
        ]);
        $lend->save();

        return $request;
    }

    /**
     * Display the specified resource.
     */
    public function show(Lend $lend)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lend $lend)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lend $lend)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lend $lend)
    {
        //
    }
}
