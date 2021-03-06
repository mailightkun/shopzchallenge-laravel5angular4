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
        $stores = \DB::select("SELECT *, ( 3959 * acos( cos( radians(37) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(-122) ) + sin( radians(37) ) * sin( radians( latitude ) ) ) ) AS distance FROM stores WHERE liked != 1 ORDER BY distance DESC");
        // $stores = Store::all();
        return \Response::json($stores);
    }

    // function to get all liked stores from the database
    public function getPreferredStores(Response $response)
    {
        $stores = \DB::select("SELECT * FROM stores WHERE liked = 1");
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

    // function to edit the liked field for a specific shop in the database 
    public function editShopLikedStatus(Request $request)
    {
        // get returned json file
        $shop_data = $request->json()->all();
        // get shop id to edit
        $id = $shop_data['id'];
        // find store by id
        $store = Store::find($id);
        // and edit the liked status
        $store->liked = $shop_data['liked_value'];
        // then finally update store
        $store->save();
    }
}
