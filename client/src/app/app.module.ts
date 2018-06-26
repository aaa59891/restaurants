import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantSearchFormComponent } from './components/restaurant-search-form/restaurant-search-form.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionRestaurantListComponent } from './components/collection-restaurant-list/collection-restaurant-list.component';
import { HomeComponent } from './components/home/home.component';
import { RoutesModule } from './routes/routes.module';
import { LoginComponent } from './components/login/login.component';
import {DpDatePickerModule} from 'ng2-date-picker';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RestaurantListComponent,
    RestaurantSearchFormComponent,
    CollectionComponent,
    CollectionRestaurantListComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutesModule,
    HttpClientModule,
    DpDatePickerModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
