import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RestaurantListComponent } from "./components/restaurant-list/restaurant-list.component";
import { RestaurantSearchFormComponent } from "./components/restaurant-search-form/restaurant-search-form.component";
import { CollectionComponent } from "./components/collection/collection.component";
import { CollectionRestaurantListComponent } from "./components/collection-restaurant-list/collection-restaurant-list.component";
import { HomeComponent } from "./components/home/home.component";
import { RoutesModule } from "./routes/routes.module";
import { LoginComponent } from "./components/login/login.component";
import { DpDatePickerModule } from "ng2-date-picker";
import { CollectionRestaurantItemComponent } from "./components/collection-restaurant-item/collection-restaurant-item.component";
import { AuthInterceptor } from "./interceptors/AuthInterceptor";
import { CollaborateGuard } from "./guards/collaborate.guard";
import { SecureGuard } from "./guards/secure.guard";
import { ErrorInterceptor } from "./interceptors/ErrorInterceptor";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        RestaurantListComponent,
        RestaurantSearchFormComponent,
        CollectionComponent,
        CollectionRestaurantListComponent,
        HomeComponent,
        LoginComponent,
        CollectionRestaurantItemComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RoutesModule,
        HttpClientModule,
        DpDatePickerModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        CollaborateGuard,
        SecureGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
