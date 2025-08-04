<?php

namespace App\Http\Controllers;

use App\Models\Clase;
use App\Models\Materia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clases = Clase::select('dia', 'hora_inicio', 'hora_fin', 'materia_id', 'id')->where('user_id', Auth::user()->id)->get();
        $materias = Materia::where('user_id', Auth::user()->id)->get();
        return Inertia::render('dashboard', compact('clases', 'materias'));
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create($dia)
    {
        $materias = Materia::where('user_id', Auth::user()->id)->get();
        return Inertia::render('clases/create', compact('materias', 'dia'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'clases' => 'required|array',
            'clases.*.dia' => 'required|string|max:255',
            'clases.*.profesor' => 'required|string|max:255',
            'clases.*.salon' => 'required|string|max:255',
            'clases.*.edificio' => 'required|string|max:255',
            'clases.*.hora_inicio' => 'required|string|max:255',
            'clases.*.hora_fin' => 'required|string|max:255',
            'clases.*.materia_id' => 'required|integer',
        ], [
            'clases.required' => 'Se requiere al menos una clase',
            'clases.*.dia.required' => 'El dia es obligatorio',
            'clases.*.dia.string' => 'El dia debe ser una cadena de texto',
            'clases.*.dia.max' => 'El dia debe tener menos de 255 caracteres',
            'clases.*.profesor.required' => 'El profesor es obligatorio',
            'clases.*.profesor.string' => 'El profesor debe ser una cadena de texto',
            'clases.*.profesor.max' => 'El profesor debe tener menos de 255 caracteres',
            'clases.*.salon.required' => 'El salon es obligatorio',
            'clases.*.salon.string' => 'El salon debe ser una cadena de texto',
            'clases.*.salon.max' => 'El salon debe tener menos de 255 caracteres',
            'clases.*.edificio.required' => 'El edificio es obligatorio',
            'clases.*.edificio.string' => 'El edificio debe ser una cadena de texto',
            'clases.*.edificio.max' => 'El edificio debe tener menos de 255 caracteres',
            'clases.*.hora_inicio.required' => 'La hora de inicio es obligatoria',
            'clases.*.hora_inicio.string' => 'La hora de inicio debe ser una cadena de texto',
            'clases.*.hora_inicio.max' => 'La hora de inicio debe tener menos de 255 caracteres',
            'clases.*.hora_fin.required' => 'La hora de fin es obligatoria',
            'clases.*.hora_fin.string' => 'La hora de fin debe ser una cadena de texto',
            'clases.*.hora_fin.max' => 'La hora de fin debe tener menos de 255 caracteres',
            'clases.*.materia_id.required' => 'La materia es obligatoria',
            'clases.*.materia_id.integer' => 'La materia debe ser un numero entero',
        ]);

        foreach ($request->clases as $clase) {
            Clase::create([
                'user_id' => Auth::user()->id,
                'dia' => $clase['dia'],
                'profesor' => $clase['profesor'],
                'salon' => $clase['salon'],
                'edificio' => $clase['edificio'],
                'hora_inicio' => $clase['hora_inicio'],
                'hora_fin' => $clase['hora_fin'],
                'materia_id' => $clase['materia_id'],
            ]);
        }

        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Clase $clase)
    {
        $materia = Materia::find($clase->materia_id);
        return Inertia::render('clases/show', compact('clase', 'materia'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Clase $clase)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Clase $clase)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Clase $clase)
    {
        //
    }
}
