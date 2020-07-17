import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InsertbettypeComponent } from './bettype/insertbettype/insertbettype.component';
import { UpdatebettypeComponent } from './bettype/updatebettype/updatebettype.component';
import { DeletebettypeComponent } from './bettype/deletebettype/deletebettype.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule }    from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DeletecountryComponent } from './country/deletecountry/deletecountry.component';
import { InsertcountryComponent } from './country/insertcountry/insertcountry.component';
import { UpdatecountryComponent } from './country/updatecountry/updatecountry.component';
import { DeleteeventComponent } from './event/deleteevent/deleteevent.component';
import { InserteventComponent } from './event/insertevent/insertevent.component';
import { UpdateeventComponent } from './event/updateevent/updateevent.component';
import { DeletemarketComponent } from './market/deletemarket/deletemarket.component';
import { UpdatemarketComponent } from './market/updatemarket/updatemarket.component';
import { InsertmarketComponent } from './market/insertmarket/insertmarket.component';
import { DeletesportComponent } from './sport/deletesport/deletesport.component';
import { InsertsportComponent } from './sport/insertsport/insertsport.component';
import { UpdatesportComponent } from './sport/updatesport/updatesport.component';
import { DeletetournamentComponent } from './tournament/deletetournament/deletetournament.component';
import { InserttournamentComponent } from './tournament/inserttournament/inserttournament.component';
import { UpdatetournamentComponent } from './tournament/updatetournament/updatetournament.component';

@NgModule({
  declarations: [
    AppComponent,
    InsertbettypeComponent,
    UpdatebettypeComponent,
    DeletebettypeComponent,
    NavbarComponent,
    HomeComponent,
    DeletecountryComponent,
    InsertcountryComponent,
    UpdatecountryComponent,
    DeleteeventComponent,
    InserteventComponent,
    UpdateeventComponent,
    DeletemarketComponent,
    UpdatemarketComponent,
    InsertmarketComponent,
    DeletesportComponent,
    InsertsportComponent,
    UpdatesportComponent,
    DeletetournamentComponent,
    InserttournamentComponent,
    UpdatetournamentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
