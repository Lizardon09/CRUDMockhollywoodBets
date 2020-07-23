import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { DeletebettypeComponent } from './bettype/deletebettype/deletebettype.component';
import { InsertbettypeComponent } from './bettype/insertbettype/insertbettype.component';
import { UpdatebettypeComponent } from './bettype/updatebettype/updatebettype.component';

import { DeletecountryComponent } from './country/deletecountry/deletecountry.component';
import { InsertcountryComponent } from './country/insertcountry/insertcountry.component';
import { UpdatecountryComponent } from './country/updatecountry/updatecountry.component';

import { DeleteeventComponent } from './event/deleteevent/deleteevent.component';
import { InserteventComponent } from './event/insertevent/insertevent.component';
import { UpdateeventComponent } from './event/updateevent/updateevent.component';

import { DeletemarketComponent } from './market/deletemarket/deletemarket.component';
import { InsertmarketComponent } from './market/insertmarket/insertmarket.component';
import { UpdatemarketComponent } from './market/updatemarket/updatemarket.component';

import { DeletesportComponent } from './sport/deletesport/deletesport.component';
import { InsertsportComponent } from './sport/insertsport/insertsport.component';
import { UpdatesportComponent } from './sport/updatesport/updatesport.component';

import { DeletetournamentComponent } from './tournament/deletetournament/deletetournament.component';
import { InserttournamentComponent } from './tournament/inserttournament/inserttournament.component';
import { UpdatetournamentComponent } from './tournament/updatetournament/updatetournament.component';

import { BetslipComponent } from './betslip/betslip.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},

  {path: 'bettype/delete', component: DeletebettypeComponent},
  {path: 'bettype/insert', component: InsertbettypeComponent},
  {path: 'bettype/update', component: UpdatebettypeComponent},

  {path: 'country/delete', component: DeletecountryComponent},
  {path: 'country/insert', component: InsertcountryComponent},
  {path: 'country/update', component: UpdatecountryComponent},

  {path: 'event/delete', component: DeleteeventComponent},
  {path: 'event/insert', component: InserteventComponent},
  {path: 'event/update', component: UpdateeventComponent},

  {path: 'market/delete', component: DeletemarketComponent},
  {path: 'market/insert', component: InsertmarketComponent},
  {path: 'market/update', component: UpdatemarketComponent},

  {path: 'sport/delete', component: DeletesportComponent},
  {path: 'sport/insert', component: InsertsportComponent},
  {path: 'sport/update', component: UpdatesportComponent},

  {path: 'tournament/delete', component: DeletetournamentComponent},
  {path: 'tournament/insert', component: InserttournamentComponent},
  {path: 'tournament/update', component: UpdatetournamentComponent},

  {path: 'betslip', component: BetslipComponent},

  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
