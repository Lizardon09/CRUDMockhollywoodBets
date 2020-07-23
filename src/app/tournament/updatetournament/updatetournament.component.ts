import { Component, OnInit } from '@angular/core';
import { ITournament } from '../../services/tournament/tournament';
import { TournamentService } from '../../services/tournament/tournament.service';
import { IBettype } from '../../services/bettype/bettype';
import { BettypeService } from '../../services/bettype/bettype.service';
import { ITournamentBettype } from '../../services/tournament/tournamentbettype';
import { ITournamentBettypeInfo } from '../../services/tournament/tournamentbettypeinfo';

import { ICountry } from '../../services/country/country';
import { CountryService } from '../../services/country/country.service';

import { ISport } from '../../services/sport/sport';
import { SportService } from '../../services/sport/sport.service';

import { ITournamentSCInfo } from '../../services/tournament/tournamentscinfo';
import { ITournamentSC } from 'src/app/services/tournament/tournamentsc';

@Component({
  selector: 'app-updatetournament',
  templateUrl: './updatetournament.component.html',
  styleUrls: ['./updatetournament.component.css']
})
export class UpdatetournamentComponent implements OnInit {

  countries : ICountry[] = [];
  sports : ISport[] = [];
  tournaments : ITournament[] = [];
  bettypes : IBettype[] = [];
  tournamentbettypeinfos : ITournamentBettypeInfo[] = [];
  tournamentscinfos : ITournamentSCInfo[] = [];
  successfullupdate = false;
  unsuccessfullupdate = false;
  disablebutton = true;
  selectedtournament : ITournament;
  selectedtournamentbettype : ITournamentBettypeInfo;
  selectedtournamentsc : ITournamentSCInfo;

  constructor(private tournamentservice : TournamentService, private bettypeservice : BettypeService, private sportservice : SportService, private countryservice : CountryService) { }

  ngOnInit(): void {
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
    this.tournamentservice.getTournamentBettypeInfo().subscribe(data=>this.tournamentbettypeinfos=data);
    this.sportservice.getSports().subscribe(data=>this.sports=data);
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
    this.tournamentservice.getTournamentSCInfo().subscribe(data=>this.tournamentscinfos=data);
  }

  disableButton(){
    if((this.selectedtournament && this.selectedtournament.name) || this.selectedtournamentbettype || this.selectedtournamentsc){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  onNameKey(event){
    this.selectedtournament.name = event.target.value;
    this.disableButton();
  }

  onTournamentKey(tournament){
    this.selectedtournamentbettype.tournamentId = tournament.id;
    this.selectedtournamentbettype.tournamentName = tournament.name;
    this.disableButton();
  }

  onTournamentBettypeKey(bettype){
    this.selectedtournamentbettype.bettypeId = bettype.id;
    this.selectedtournamentbettype.bettypeName = bettype.name;
    this.disableButton();
  }

  onTournamentTSCKey(tournament){
    this.selectedtournamentsc.tournamentId = tournament.id;
    this.selectedtournamentsc.tournamentName = tournament.name;
    this.disableButton();
  }

  onSportTSCKey(sport){
    this.selectedtournamentsc.sportId = sport.id;
    this.selectedtournamentsc.sportName = sport.name;
    this.disableButton();
  }

  onCountryTSCKey(country){
    this.selectedtournamentsc.countryId = country.id;
    this.selectedtournamentsc.countryName = country.name;
    this.disableButton();
  }

  startUpdate(){
    this.updateTournament(this.selectedtournament);
  }

  startTournamentBettypeUpdate(){
    this.updateTournamentBettype({id:this.selectedtournamentbettype.id,tournamentid:this.selectedtournamentbettype.tournamentId,bettypeid:this.selectedtournamentbettype.bettypeId});
  }

  startTournamentSCUpdate(){
    this.updateTournamentSC({id:this.selectedtournamentsc.id,tournamentid:this.selectedtournamentsc.tournamentId,countryid:this.selectedtournamentsc.countryId,sportid:this.selectedtournamentsc.sportId})
  }

  updateTournament(tournament : ITournament){
    this.tournamentservice.updateTournament(tournament)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.updateResultStatus(data)
          })
        })
  }

  updateTournamentBettype(tournamentbettype : ITournamentBettype){
    this.tournamentservice.updateTournamentBettype(tournamentbettype)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.updateResultStatus(data)
          })
        })
  }  

  updateTournamentSC(tournamentsc : ITournamentSC){
    this.tournamentservice.updateTournamentSC(tournamentsc)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.updateResultStatus(data)
          })
        })
  }  

  selectTournament(tournament : any){
    this.selectedtournament = {...tournament};
    this.selectedtournamentbettype = null;
    this.selectedtournamentsc = null;
    window.scrollTo(0,0);
    this.disablebutton = true;
  }

  selectTournamentBettype(tournamentbettype : any){
    this.selectedtournamentbettype = {...tournamentbettype};
    this.selectedtournament = null;
    this.selectedtournamentsc = null;
    window.scrollTo(0,0);
    this.disablebutton = true;
  }

  selectTournamentSC(tournamentsc : any){
    this.selectedtournamentsc = {...tournamentsc};
    this.selectedtournamentbettype = null;
    this.selectedtournament = null;
    window.scrollTo(0,0);
    this.disablebutton = true;
  }

  updateResultStatus(data : any){
    if(data.status=="Success"){
      this.successfullupdate = true;
      this.unsuccessfullupdate = false;
    }
    else if(data.status=="Cancelled"){
      return;
    }
    else{
      this.unsuccessfullupdate = true;
      this.successfullupdate = false;
    }
    this.disableButton();
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
    this.tournamentservice.getTournamentBettypeInfo().subscribe(data=>this.tournamentbettypeinfos=data);
    this.sportservice.getSports().subscribe(data=>this.sports=data);
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
    this.tournamentservice.getTournamentSCInfo().subscribe(data=>this.tournamentscinfos=data);
  }

  closeSuccess(){
    this.successfullupdate = false;
    this.unsuccessfullupdate = false;
  }

  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("I promise to return after one second!");
      }, 300);
    });
  }

}
