<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Response;
use App\Store;

class StoreController extends Controller
{
    // saves a store to the database
    function saveStore($item, $photo_reference)
    {
        $store = new Store([
            'storeid' =>  $item['id'],
            'name' =>  $item['name'],
            'address' =>$item['vicinity'],
            'latitude' =>$item['geometry']['location']['lat'],
            'longitude' => $item['geometry']['location']['lng'],
            'photo_reference' => $photo_reference,
            'liked' => '0'
            ]);
        $store->save();
    }

    // function to get all stores from the database
    public function getStores(Response $response)
    {
        $stores = Store::all();
        return \Response::json($stores);
    }

    // function to save and store scanned nearby stores
    public function storeData(Request $request)
    {
        // variables ;
        $place_id = "";
        $photo_reference = "";
        $data = $request->json()->all();

        foreach($data as $item)
        {
            try
            {
                // some stores don't have photos so I set the variable to null, so that I check it later
                if(empty($item['photos'][0]['photo_reference']))
                $photo_reference = 'null';
            else
                $photo_reference = $item['photos'][0]['photo_reference'];
            }
            catch(Exception $ex)
            {
                $photo_reference = 'undefined';
            }

            // add the shop to the database
            try { $this->saveStore($item, $photo_reference); } catch(Exception $ex) { }
        }
    }
}
