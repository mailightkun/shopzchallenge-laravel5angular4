import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  constructor(private _http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});
  title = 'Shopz | Laravel Angular 4 App';
  nearbyStores;

  ngOnInit()
  {
    var current_position;

   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
      {
        console.log(position);
        current_position = position;

        var currentLat = current_position.coords.latitude;
        var currentLong = current_position.coords.longitude;

        this._http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + currentLat +',' + currentLong + '&radius=2000&type=store&key=AIzaSyDVXB82GslAi4XRpIkHwrE9P8HQ8HwD7JE').subscribe(data =>
        {
          var json = JSON.parse(data['_body']);
          this.nearbyStores = json.results;
          console.log(this.nearbyStores);
          return this._http.post('http://shums.dev/laravel_php/shopz-challenge/laShopz/public/addStores', this.nearbyStores, {headers: this.headers})
          .toPromise().then(res => res.json()).catch(this.handleError);
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  private handleError(error: any): Promise<any>
  {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
