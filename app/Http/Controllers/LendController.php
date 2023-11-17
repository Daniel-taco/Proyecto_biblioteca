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
    public function destroy(Request $request)
    {
        // Busca el préstamo por su id
        $lend = Lend::find($request->id);

        // Verifica si el préstamo existe
        if (!$lend) {
            return response()->json(['error' => 'Lend not found'], 404);
        }

        try {
            // Elimina el préstamo
            $lend->delete();

            // Realiza operaciones adicionales, como decrementar las copias disponibles del libro asociado
            // ...

            return response()->json(['message' => 'Lend deleted successfully']);
        } catch (\Exception $e) {
            // Maneja cualquier error que pueda ocurrir durante la eliminación
            return response()->json(['error' => 'An error occurred while deleting the lend'], 500);
        }
    }
}
