import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NearbyShopsComponent } from "./components/nearby-shops/nearby-shops.component";
import { MyPreferredShopsComponent } from "./components/my-preferred-shops/my-preferred-shops.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { LaravelService } from "./services/laravel.service"


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
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [LaravelService],
  bootstrap: [AppComponent]
})


export class AppModule { }
