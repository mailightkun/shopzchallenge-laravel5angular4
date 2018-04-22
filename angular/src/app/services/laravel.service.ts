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
  public preferredShops: any;

  // get all nearby shops as json file
  getNearbyStores(lat, long)
  {
     let nearbyShops = this._http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat +',' + long + '&radius=2000&type=store&key=AIzaSyA4YXnX2QN4enqTUEqYUYDm6Co1aXXqhyE'); // AIzaSyDVXB82GslAi4XRpIkHwrE9P8HQ8HwD7JE
     let getShops = this._http.get(this.server + 'shops');
     let getPreferredShops = this._http.get(this.server + 'liked-shops');

     Observable.forkJoin([nearbyShops, getShops, getPreferredShops]).subscribe(data =>
      {
        var nearby_shops = JSON.parse(data[0]['_body']); // data[0] = nearbyShops
        this.stores = data[1]; // data[1] = getShops
        this.preferredShops = data[2]; // data[2] = getPreferredShops
        this.postNearbyStores(nearby_shops.results).catch(function(err) { console.log(err); });
    });
  }

  // post returned nearby shops to the backend to be stored in the database
  postNearbyStores(json)
  {
    return this._http.post(this.server + 'add-stores', json, {headers: this.headers})
    .toPromise().then(res => res.json()).catch(this.handleError);
  }

  // post liked / disliked shop status to the backend
  postShopLikedStatus(id, like_value)
  {
    var json = JSON.stringify( { id: id, liked_value: like_value } );
    return this._http.post(this.server + 'edit-shop-status', json, {headers: this.headers})
    .toPromise().then(res => res.json()).catch(this.handleError);
  }

  // handle any errors function
  private handleError(error: any): Promise<any>
  {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
