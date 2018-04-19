@extends('layouts.app')
@section('content')
<div class="container">
    <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Post</th>
        <th colspan="2">Action</th>
      </tr>
    </thead>
    <tbody>
      @foreach($tasks as $task)
      <tr>
        <td>{{$task['id']}}</td>
        <td>{{$task['title']}}</td>
        <td>{{$task['post']}}</td>
        <td><a href="{{action('TaskController@edit', $task['id'])}}" class="btn btn-warning">Edit</a></td>
        <td>
            <form action="{{action('TaskController@destroy', $task['id'])}}" method="post">
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
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script>
      var storesURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.014714,-6.742299&radius=1500&type=restaurant&key=AIzaSyDVXB82GslAi4XRpIkHwrE9P8HQ8HwD7JE';
      $.getJSON(storesURL, function(data)
      {
        console.log(data.results);
      });

  </script>
  </div>
  @stop