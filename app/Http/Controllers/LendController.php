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
            'id_user' => $request->id_user,
            'lend_date' => $request->lend_date,
            'expected_return_date' => $request->expected_return_date,
            'lend_state' => $request->lend_state
        ]);
        $lend->save();

        return $lend;
    }

    /**
     * Display the specified resource.
     */
    public function show(request $request, Lend $lend)
    {
        $userId = $request->id;
    
        if ($userId != $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $lends = Lend::where('id_user', $userId)->get();

        return response()->json($lends);
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
        $lend = Lend::where('id', $request->id)->first();

        $lend->update([
            'id_user' => $request->id_user,
            'lend_date' => $request->lend_date,
            'expected_return_date' => $request->expected_return_date,
            'lend_state' => $request->lend_state
        ]);

        $lend->save();
        return $lend;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lend $lend)
    {
        //
    }
}
