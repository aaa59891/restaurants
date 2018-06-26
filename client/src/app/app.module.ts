import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantSearchFormComponent } from './components/restaurant-search-form/restaurant-search-form.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionRestaurantListComponent } from './components/collection-restaurant-list/collection-restaurant-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RestaurantListComponent,
    RestaurantSearchFormComponent,
    CollectionComponent,
    CollectionRestaurantListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
