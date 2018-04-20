import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NearbyShopsComponent } from "./components/nearby-shops/nearby-shops.component";
import { MyPreferredShopsComponent } from "./components/my-preferred-shops/my-preferred-shops.component";

// main routing system
const appRoutes: Routes = [
  { path: "mainPage", component: MainPageComponent },
  { path: "nearbyShops", component: NearbyShopsComponent },
  { path: "myPreferredShops", component: MyPreferredShopsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
