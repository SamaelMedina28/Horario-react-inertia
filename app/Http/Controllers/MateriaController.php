<?php

namespace App\Http\Controllers;

use App\Models\Materia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MateriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $materiasAnteriores = Materia::where('user_id', Auth::user()->id)->get();
        if (!$materiasAnteriores->isEmpty()) {
            return redirect()->route('clases.create', ['dia' => 'Lunes']);
        }
        return Inertia::render('materias/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'materias' => 'required|array',
            'materias.*.nombre' => 'required|string|max:255',
        ], [
            'materias.required' => 'Se requiere al menos una materia',
            'materias.*.nombre.required' => 'El nombre de la materia es obligatorio',
            'materias.*.nombre.string' => 'El nombre de la materia debe ser una cadena de texto',
            'materias.*.nombre.max' => 'El nombre de la materia debe tener menos de 255 caracteres',
        ]);

        foreach ($request->materias as $materia) {
            Materia::create([
                'user_id' => Auth::user()->id,
                'nombre' => $materia['nombre'],
            ]);
        }

        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Materia $materia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        $materiasAnteriores = Materia::where('user_id', Auth::user()->id)->get();
        return Inertia::render('materias/edit', compact('materiasAnteriores'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'materias' => 'required|array',
            'materias.*.nombre' => 'required|string|max:255',
        ], [
            'materias.required' => 'Se requiere al menos una materia',
            'materias.*.nombre.required' => 'El nombre de la materia es obligatorio',
            'materias.*.nombre.string' => 'El nombre de la materia debe ser una cadena de texto',
            'materias.*.nombre.max' => 'El nombre de la materia debe tener menos de 255 caracteres',
        ]);

        $user = Auth::user();

        foreach ($request->materias as $materiaData) {
            if ($materiaData['id'] > 0) {
                $user->materias()
                    ->where('id', $materiaData['id'])
                    ->update([
                        'nombre' => $materiaData['nombre'],
                    ]);
            } else {
                $user->materias()->create([
                    'nombre' => $materiaData['nombre'],
                ]);
            }
        }

        return redirect()->route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Materia $materia)
    {
        $materia->delete();
        return redirect()->route('materias.edit');
    }
}
