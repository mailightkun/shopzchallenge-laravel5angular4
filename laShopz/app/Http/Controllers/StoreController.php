<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Response;
use App\Store;

class StoreController extends Controller
{
    public function storeData(Request $request)
    {
        $place_id = "";
        $photo_reference = "";
        $data = $request->json()->all();

        foreach($data as $item)
        {
            if(empty($item['place_id']) || empty($item['photos']['photo_reference']) )
            {
                $item['place_id'] = $place_id;
                $item['photos']['photo_reference'] = $photo_reference;
            }
            else
            {
                $place_id = $item['place_id'];
                $photo_reference = $item['photos'][0]['photo_reference'];
            }

            $store = new Store([
                'storeid' =>  $place_id,
                'name' =>  $item['name'],
                'address' =>$item['vicinity'],
                'latitude' =>$item['geometry']['location']['lat'],
                'longitude' => $item['geometry']['location']['lng'],
                'photo_reference' => $photo_reference,
                'liked' => '0'
            ]);
            $store->save();
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) { }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
