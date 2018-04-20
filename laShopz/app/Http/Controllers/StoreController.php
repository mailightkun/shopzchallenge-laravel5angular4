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
            'storeid' =>  $item['place_id'],
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
        $place_id = "";
        $photo_reference = "";
        $data = $request->json()->all();

        foreach($data as $item)
        {
            try
            {
                if(empty($item['photos'][0]['photo_reference']))
                $photo_reference = 'null';
            else
                $photo_reference = $item['photos'][0]['photo_reference'];
            }
            catch(Exception $ex)
            {
                $photo_reference = 'undefined';
            }

            $stores__ = Store::all();

            if(!$stores__ == '[]')
            {
                foreach(Store::all() as $_store_)
                {
                    if($_store_->storeid != $item['place_id'])
                        $this->saveStore($item, $photo_reference);
                    else break;
                }
            }
            else $this->saveStore($item, $photo_reference);
        }
    }
}
