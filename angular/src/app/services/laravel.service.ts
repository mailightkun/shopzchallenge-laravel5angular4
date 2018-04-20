import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class LaravelService
{
  constructor(private _http: Http) { }

  // main laravel backend server
  server = 'http://shums.dev/laravel_php/shopz-challenge/laShopz/public/';
  // main http headers
  private headers = new Headers({'Content-Type': 'application/json'});
  // stores variable to save the nearby shops
  public stores: any;

  // get all nearby shops as json file
  getNearbyStores(lat, long)
  {
     let nearbyShops = this._http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat +',' + long + '&radius=2000&type=store&key=AIzaSyA4YXnX2QN4enqTUEqYUYDm6Co1aXXqhyE'); // AIzaSyDVXB82GslAi4XRpIkHwrE9P8HQ8HwD7JE
     let getShops = this._http.get(this.server + 'getStores');

     Observable.forkJoin([nearbyShops, getShops]).subscribe(data =>
      {
      // data[0] = nearbyShops
      // data[1] = getShops
      var set_shops_json = JSON.parse(data[0]['_body']);
      var get_shops_json = data[1];
      this.stores = get_shops_json;
      this.postNearbyStores(set_shops_json.results).catch(function(err) { console.log(err); });
    });
  }

  // post returned nearby shops to the backend to be stored in the database
  postNearbyStores(json)
  {
    return this._http.post(this.server + 'addStores', json, {headers: this.headers})
    .toPromise().then(res => res.json()).catch(this.handleError);
  }

  // get all the shops stored in the database
  getShops()
  {
    this._http.get(this.server + 'getStores').subscribe(data => {
      var json = JSON.parse(data['_body']);
      // console.log(json); // test
      return json;
    });
  }

  // handle any errors function
  private handleError(error: any): Promise<any>
  {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
