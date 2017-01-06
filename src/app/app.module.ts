import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Component } from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { FormsModule ,FormControl, ReactiveFormsModule} from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {RouterModule, Routes } from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {CarService} from './edmund.service';
import {CarComponent} from './edmunds-car/edmund.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {CarRepairStoreComponent} from './edmunds-repairshops/edmunds-cars.component';
import {DealersComponent} from './edmunds-dealers-info/edmund-dealer.component';
import {ArticlesComponent} from './edmund-car-articles/edmund-car-article.component';

@Component({
  selector: 'router-app',
  template: `
  <div>
    <nav>
    <div>
        <a [routerLink]="['car']">Car details</a>
        <a [routerLink]="['repair']">Car repair stores</a>
        <a [routerLink]="['dealer']">Car dealer stores</a>
        <a [routerLink]="['articles']">Articles about cars</a>


</div> </nav>
    <router-outlet></router-outlet>
  </div>
`,
styleUrls:['./app.component.css']
})
class RoutesDemoApp { }
const routes:Routes = [
  { path: '', component:AppComponent},
  { path: 'car', component:CarComponent},
  { path: 'repair', component:CarRepairStoreComponent},
  { path: 'dealer', component:DealersComponent},
  { path: 'articles', component:ArticlesComponent}



];
@NgModule({
  declarations: [
    AppComponent,CarRepairStoreComponent,ArticlesComponent,DealersComponent,RoutesDemoApp,CarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ChartsModule,
    FormsModule,  
    JsonpModule,
    HttpModule,
    RouterModule.forRoot(routes)
    ],
  providers: [CarService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [RoutesDemoApp]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
.catch((err: any) => console.error(err));

