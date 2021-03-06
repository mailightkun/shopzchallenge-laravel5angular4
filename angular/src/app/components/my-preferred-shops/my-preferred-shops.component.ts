import { Component, OnInit } from '@angular/core';
import { LaravelService } from "../../services/laravel.service"
import { Store } from '../../store';
import * as $ from 'jquery';

@Component({
  selector: 'app-my-preferred-shops',
  templateUrl: './my-preferred-shops.component.html',
  styleUrls: ['./my-preferred-shops.component.css']
})
export class MyPreferredShopsComponent implements OnInit {

  shops: Store[];

  constructor(private laravel_service: LaravelService) { }

  ngOnInit()
  {
    var json = JSON.parse(this.laravel_service.preferredShops['_body']);
    this.shops = json;
    console.log(json); // test

    // jquery code to hide shop efter being liked or disliked
    $(document).ready(function()
    {
      $("button").click(function()
      {
        var shop = $(this).parents("#shop");
        shop.fadeOut(1000);
      });
    });

  }

}
