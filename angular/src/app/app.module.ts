import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NearbyShopsComponent } from "./components/nearby-shops/nearby-shops.component";
import { MyPreferredShopsComponent } from "./components/my-preferred-shops/my-preferred-shops.component";
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NearbyShopsComponent,
    MyPreferredShopsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
