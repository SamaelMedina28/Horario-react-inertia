<?php

use App\Http\Controllers\ClaseController;
use App\Http\Controllers\ExportarController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MateriaController;
use App\Models\Clase;
use App\Models\Materia;
use Illuminate\Support\Facades\Auth;

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
