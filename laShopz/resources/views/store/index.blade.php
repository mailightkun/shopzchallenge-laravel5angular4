@extends('layouts.app')
@section('content')
<div class="container">
    <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Address</th>
        <th>latitude</th>
        <th>longitude</th>
        <th colspan="2">Action</th>
      </tr>
    </thead>
    <tbody>
      @foreach($stores as $store)
      <tr>
        <td>{{$store['id']}}</td>
        <td>{{$store['name']}}</td>
        <td>{{$store['address']}}</td>
        <td>{{$store['latitude']}}</td>
        <td>{{$store['longitude']}}</td>
        <td><a href="{{action('StoreController@edit', $store['id'])}}" class="btn btn-warning">Edit</a></td>
        <td>
            <form action="{{action('StoreController@destroy', $store['id'])}}" method="post">
                {{csrf_field()}}
                <input name="_method" type="hidden" value="DELETE">
                <button class="btn btn-danger" type="submit">Delete</button>
            </form>
        </td>
      </tr>
      </tr>
      @endforeach
    </tbody>
  </table>
  </div>
  @stop