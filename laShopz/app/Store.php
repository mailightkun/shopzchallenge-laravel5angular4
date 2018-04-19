<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $fillable = ['storeid', 'name','address','latitude', 'longitude', 'photo_reference', 'liked'];
}
