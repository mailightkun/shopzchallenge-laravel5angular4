import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NearbyShopsComponent } from './nearby-shops/nearby-shops.component';
import { MyPreferredShopsComponent } from './my-preferred-shops/my-preferred-shops.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NearbyShopsComponent,
    MyPreferredShopsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
