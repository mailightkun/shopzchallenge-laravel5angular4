import { Component, OnInit } from '@angular/core';
import { LaravelService } from "../../services/laravel.service"

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit
{
  static shops: any;
  constructor(private laravel_service: LaravelService) { }

  ngOnInit()
  {
    MainPageComponent.shops = this.laravel_service.getShops(); // test (undefined error)
  }


}
