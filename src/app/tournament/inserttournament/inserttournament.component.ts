import { Component, OnInit } from '@angular/core';
import { ITournament } from '../../services/tournament/tournament';
import { TournamentService } from '../../services/tournament/tournament.service';
import { ISport } from '../../services/sport/sport';
import { SportService } from '../../services/sport/sport.service';
import { ICountry } from '../../services/country/country';
import { CountryService } from '../../services/country/country.service';
import { IBettype } from '../../services/bettype/bettype';
import { BettypeService } from '../../services/bettype/bettype.service';
import { ITournamentSC } from '../../services/tournament/tournamentsc';
import { ITournamentBettype } from '../../services/tournament/tournamentbettype';
import { ITournamentBettypeInfo } from '../../services/tournament/tournamentbettypeinfo';
import { ITournamentSCInfo } from '../../services/tournament/tournamentscinfo';

@Component({
  selector: 'app-inserttournament',
  templateUrl: './inserttournament.component.html',
  styleUrls: ['./inserttournament.component.css']
})
export class InserttournamentComponent implements OnInit {

  tournaments : ITournament[] = [];
  sports : ISport[] = [];
  countries : ICountry[] = [];
  bettypes : IBettype[] = [];
  tournamentbettypeinfos : ITournamentBettypeInfo[] = [];
  tournamentscinfos : ITournamentSCInfo[] = [];
  successfulinsert = false;
  unsuccessfullinsert = false;
  disablebutton = true;
  disableassociationbutton = true;
  disablebettypeassociationbutton = true;
  namefield : string = "";
  maptournament : ITournament = {id:0,name:"Select Tournament"};
  mapsport : ISport = {id:0,name:"Select Sport",logo:""};
  mapcountry : ICountry = {id:0,name:"Select Country",logo:""};
  maptournamentbettype : ITournament = {id:0,name:"Select Tournament"};
  mapbettype : IBettype = {id:0,name:"Select Bettype"};

  constructor(private tournamentservice : TournamentService, private countryservice : CountryService, private sportservice : SportService, private bettypeservice : BettypeService) { }

  ngOnInit(): void {
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
    this.sportservice.getSports().subscribe(data=>this.sports=data);
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
    this.tournamentservice.getTournamentBettypeInfo().subscribe(data=>this.tournamentbettypeinfos=data);
    this.tournamentservice.getTournamentSCInfo().subscribe(data=>this.tournamentscinfos=data);
  }

  disableButton(){
    if(this.namefield){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  disableAssociationButton(){
    if(this.mapsport.id>0 && this.mapcountry.id>0 && this.maptournament.id>0){
      this.disableassociationbutton = false;
    }
    else{
      this.disableassociationbutton = true;
    }
  }

  disableBettypeAssociationButton(){
    if(this.mapbettype.id>0 && this.maptournamentbettype.id>0){
      this.disablebettypeassociationbutton = false;
    }
    else{
      this.disablebettypeassociationbutton = true;
    }
  }

  onNameKey(event){
    this.namefield = event.target.value;
    this.disableButton();
  }

  onSportKey(sport){
    this.mapsport = sport;
    this.disableAssociationButton();
  }

  onCountryKey(country){
    this.mapcountry = country;
    this.disableAssociationButton();
  }

  onTournamentKey(tournament){
    this.maptournament = tournament;
    this.disableAssociationButton();
  }

  onTournamentBettypeKey(tournament){
    this.maptournamentbettype = tournament;
    this.disableBettypeAssociationButton();
  }

  onBettypeKey(bettype){
    this.mapbettype = bettype;
    this.disableBettypeAssociationButton();
  }

  startInsert(){
    this.insertTournament({id:0,name:this.namefield});
  }

  startMap(){
    this.mapTournamentSC({id:0,tournamentid:this.maptournament.id,countryid:this.mapcountry.id,sportid:this.mapsport.id});
  }

  startTournamentBettypeMap(){
    this.mapTournamentBettype({id:0,tournamentid:this.maptournamentbettype.id,bettypeid:this.mapbettype.id});
  }

  mapTournamentBettype(tournamentBettype : ITournamentBettype){
    this.tournamentservice.mapTournamentBettype(tournamentBettype)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.insertResultStatus(data)
          })
        })
  }

  mapTournamentSC(tournamentSC : ITournamentSC){
    this.tournamentservice.mapTournamentSC(tournamentSC)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.insertResultStatus(data)
          })
        })
  }

  insertTournament(tournament : ITournament){
    this.tournamentservice.insertTournament(tournament)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.insertResultStatus(data)
          })
        })
  }

  insertResultStatus(data : any){
    if(data.status=="Success"){
      this.successfulinsert = true;
      this.unsuccessfullinsert = false;
    }
    else if(data.status=="Cancelled"){
      return;
    }
    else{
      this.unsuccessfullinsert = true;
      this.successfulinsert = false;
    }
    this.namefield = "";
    this.mapsport = {id:0,name:"Select Sport",logo:""};
    this.mapcountry = {id:0,name:"Select Country",logo:""};
    this.maptournament = {id:0,name:"Select Tournament"};
    this.maptournamentbettype = {id:0,name:"Select Tournament"};
    this.mapbettype = {id:0,name:"Select Bettype"};
    this.disableButton();
    window.scrollTo(0,0);
    this.disableAssociationButton();
    this.disableBettypeAssociationButton();
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
    this.sportservice.getSports().subscribe(data=>this.sports=data);
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
    this.tournamentservice.getTournamentBettypeInfo().subscribe(data=>this.tournamentbettypeinfos=data);
    this.tournamentservice.getTournamentSCInfo().subscribe(data=>this.tournamentscinfos=data);
  }

  closeSuccess(){
    this.successfulinsert = false;
    this.unsuccessfullinsert = false;
  }

  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("I promise to return after one second!");
      }, 300);
    });
  }

}
