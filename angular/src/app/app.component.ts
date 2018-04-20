import { Component, Injectable, OnInit } from '@angular/core';
import { LaravelService } from "./services/laravel.service"
import { MainPageComponent } from './components/main-page/main-page.component';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  title = 'Shopz | Laravel Angular 4 App';
  nearbyStores;

  constructor(private laravel_service: LaravelService) { }

  ngOnInit()
  {
    // variable to store the users current location using the geolocation
    var current_position;
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
      {
        console.log(position);
        current_position = position;
        var currentLat = current_position.coords.latitude;
        var currentLong = current_position.coords.longitude;
        // get nearby stores from the google maps api
        this.laravel_service.getNearbyStores(currentLat, currentLong);
      });
    } else {
      // return error if else
      alert("Geolocation is not supported by this browser.");
    }

    MainPageComponent.shops = this.laravel_service.getShops();
    console.log(MainPageComponent.shops);
  }

  // handle errors functions
  private handleError(error: any): Promise<any>
  {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
