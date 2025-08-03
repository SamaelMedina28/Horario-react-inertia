<?php

use App\Http\Controllers\ClaseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MateriaController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', 'is_new'])->group(function () {
    Route::get('materias/create', [MateriaController::class, 'create'])->name('materias.create');
    Route::post('materias', [MateriaController::class, 'store'])->name('materias.store');
    Route::get('clases/create', [ClaseController::class, 'create'])->name('clases.create');
    Route::post('clases', [ClaseController::class, 'store'])->name('clases.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
