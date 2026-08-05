<?php

use App\Http\Controllers\ClaseController;
use App\Http\Controllers\ImportarController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MateriaController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified', 'is_old'])->group(function () {
    Route::get('dashboard', [ClaseController::class, 'index'])->name('dashboard');
    // ? Materias
    Route::get('materias/edit', [MateriaController::class, 'edit'])->name('materias.edit');
    Route::post('materias/update', [MateriaController::class, 'update'])->name('materias.update');
    Route::delete('materias/{materia}', [MateriaController::class, 'destroy'])->name('materias.destroy');

    // ? Clases
    Route::get('clases/edit/{dia}', [ClaseController::class, 'edit'])->name('clases.edit');
    Route::post('clases/update', [ClaseController::class, 'update'])->name('clases.update');
    Route::delete('clases/{clase}', [ClaseController::class, 'destroy'])->name('clases.destroy');
    Route::get('clases/{clase}', [ClaseController::class, 'show'])->name('clases.show');
});

Route::middleware(['auth', 'verified', 'is_new'])->group(function () {
    // ? Pagina inicial para decidir si exportara las materias o las ingresara manualmente
    Route::get('inicio', function () {
        return Inertia::render('inicio');
    })->name('inicio');

    // ? Exportar por PDF
    // Vamos a ocupar las vistas:
    // exportar - get
    // carga - post
    // Confirmacion - get
    // creacion de horario - post
    Route::get('importar', [ImportarController::class, 'import'])->name('importar'); // Vista para subir el archivo
    Route::post('carga', [ImportarController::class, 'upload'])->name('carga'); // Procesar el archivo y sacar la informacion de las clases
    Route::get('confirmacion', [ImportarController::class, 'confirm'])->name('confirmacion'); // Preguntarle al usuario si el horario sacado es el correcto y pintarlo en pantalla
    Route::post('creacion', [ImportarController::class, 'createSchedule'])->name('creacion'); // Cargar los datos confirmados en la base de datos
    

    // ? Materias
    Route::get('materias/create', [MateriaController::class, 'create'])->name('materias.create');
    Route::post('materias', [MateriaController::class, 'store'])->name('materias.store');

    // ? Clases
    Route::get('clases/create/{dia}', [ClaseController::class, 'create'])->name('clases.create');
    Route::post('clases', [ClaseController::class, 'store'])->name('clases.store');
    Route::post('clases/updateNew', [ClaseController::class, 'updateNew'])->name('clases.updateNew');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
