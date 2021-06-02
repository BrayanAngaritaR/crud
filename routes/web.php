<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Listar todos los usuarios
Route::get('/users', ['App\Http\Controllers\User\UsersController', 'index'])->name('user.users.index');

//Ver detalles del usuario
Route::get('/users/{user}', ['App\Http\Controllers\User\UsersController', 'show'])->name('user.users.show');

//Agregar un nuevo usuario
Route::get('/user/create', ['App\Http\Controllers\User\UsersController', 'create'])->name('user.users.create');

Route::post('/user/create', ['App\Http\Controllers\User\UsersController', 'store'])->name('user.users.store');

//Editar el usuario
Route::get('/users/{user}/edit', ['App\Http\Controllers\User\UsersController', 'edit'])->name('user.users.edit');

Route::post('/users/{user}/edit', ['App\Http\Controllers\User\UsersController', 'update'])->name('user.users.update');

//Eliminar el usuario
Route::delete('/users/{user}/delete', ['App\Http\Controllers\User\UsersController', 'destroy'])->name('user.users.destroy');