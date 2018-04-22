<?php

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

Route::get('/', function () { return view('welcome'); });
Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');

// store routes

Route::resource('store', 'StoreController');
Route::post('add-stores', 'StoreController@storeData');
Route::post('edit-shop-status', 'StoreController@editShopLikedStatus');
Route::get('shops', 'StoreController@getStores');
Route::get('liked-shops', 'StoreController@getPreferredStores');