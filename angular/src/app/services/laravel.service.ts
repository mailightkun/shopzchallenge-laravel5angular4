import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class LaravelService
{
  constructor(private _http: Http) { }

  // main laravel backend server
  server = 'http://shums.dev/laravel_php/shopz-challenge/laShopz/public/';
  // main http headers
  private headers = new Headers({'Content-Type': 'application/json'});
  public stores;

  // get all nearby shops as json file
  getNearbyStores(lat, long)
  {
    this._http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat +',' + long + '&radius=2000&type=store&key=AIzaSyDVXB82GslAi4XRpIkHwrE9P8HQ8HwD7JE').subscribe(data =>
    {
      var json = JSON.parse(data['_body']);
      this.postNearbyStores(json.results);
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
      console.log(json); // test
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
