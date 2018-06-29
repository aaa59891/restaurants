import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { LoginComponent } from "../components/login/login.component";
import { CollaborateGuard } from "../guards/collaborate.guard";
import { SecureGuard } from "../guards/secure.guard";
import { PageNotFoundComponent } from "../components/page-not-found/page-not-found.component";


const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', component: HomeComponent, canActivate: [SecureGuard]},
    {path: 'collaborate', component: HomeComponent, canActivate: [CollaborateGuard]},
    {path: '404', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/404'},

]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class RoutesModule {}
