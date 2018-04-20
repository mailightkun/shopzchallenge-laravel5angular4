import { Component, OnInit } from '@angular/core';
import { LaravelService } from "../../services/laravel.service"
import { Store } from '../../store';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit
{
  shops: Store[];
  constructor(private laravel_service: LaravelService) { }

  ngOnInit()
  {
    console.log('database shops : ' + this.laravel_service.stores);
    var json = JSON.parse(this.laravel_service.stores['_body']);
    this.shops = json;
    console.log(json);
  }
}
