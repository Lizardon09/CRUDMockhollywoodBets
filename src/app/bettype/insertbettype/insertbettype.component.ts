import { Component, OnInit } from '@angular/core';
import { IBettype } from '../../services/bettype/bettype';
import { BettypeService } from '../../services/bettype/bettype.service';
import { IMarket } from '../../services/market/market';
import { MarketService } from '../../services/market/market.service';
import { ITournament } from '../../services/tournament/tournament';
import { TournamentService } from '../../services/tournament/tournament.service';
import { ITournamentBettype } from '../../services/tournament/tournamentbettype';
import { ITournamentBettypeInfo } from '../../services/tournament/tournamentbettypeinfo';
import { IMarketBettype } from '../../services/market/marketbettype';
import { IMarketBettypeInfo } from '../../services/market/marketbettypeinfo';

@Component({
  selector: 'app-insertbettype',
  templateUrl: './insertbettype.component.html',
  styleUrls: ['./insertbettype.component.css']
})
export class InsertbettypeComponent implements OnInit {

  bettypes : IBettype[] = [];
  tournaments : ITournament[] = [];
  markets : IMarket[] = [];
  tournamentbettypeinfos : ITournamentBettypeInfo[] = [];
  marketbettypeinfos : IMarketBettypeInfo[] = [];
  successfulinsert = false;
  unsuccessfullinsert = false;
  disablebutton = true;
  disabletournamentbettypeassociationbutton = true;
  disablemarketbettypeassociationbutton = true;
  namefield : string = "";
  maptournament : ITournament = {id:0,name:"Select Tournament"};
  mapbettypetournament : IBettype = {id:0,name:"Select Bettype"};
  mapmarket : IMarket = {id:0,name:"Select Market"};
  mapbettypemarket : IBettype = {id:0,name:"Select Bettype"};

  constructor(private bettypeservice : BettypeService, private tournamentservice : TournamentService, private marketservice : MarketService) { }

  ngOnInit(): void {
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
    this.tournamentservice.getTournamentBettypeInfo().subscribe(data=>this.tournamentbettypeinfos=data);
    this.marketservice.getMarkets().subscribe(data=>this.markets=data);
    this.marketservice.getMarketBettypeInfo().subscribe(data=>this.marketbettypeinfos=data);
  }

  disableButton(){
    if(this.namefield){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  disableTournamentBettypeAssociationButton(){
    if(this.mapbettypetournament.id>0 && this.maptournament.id>0){
      this.disabletournamentbettypeassociationbutton = false;
    }
    else{
      this.disabletournamentbettypeassociationbutton = true;
    }
  }

  disableMarketBettypeAssociationButton(){
    if(this.mapbettypemarket.id>0 && this.mapmarket.id>0){
      this.disablemarketbettypeassociationbutton = false;
    }
    else{
      this.disablemarketbettypeassociationbutton = true;
    }
  }

  onNameKey(event){
    this.namefield = event.target.value;
    this.disableButton();
  }

  onTournamentKey(tournament){
    this.maptournament = tournament;
    this.disableTournamentBettypeAssociationButton();
  }

  onBettypeTournamentKey(bettype){
    this.mapbettypetournament = bettype;
    this.disableTournamentBettypeAssociationButton();
  }

  onMarketKey(market){
    this.mapmarket = market;
    this.disableMarketBettypeAssociationButton();
  }

  onBettypeMarketKey(bettype){
    this.mapbettypemarket = bettype;
    this.disableMarketBettypeAssociationButton();
  }

  startInsert(){
    this.insertBettype({id:0,name:this.namefield});
  }

  startTournamentBettypeMap(){
    this.mapTournamentBettype({id:0,tournamentid:this.maptournament.id,bettypeid:this.mapbettypetournament.id});
  }

  startMarketBettypeMap(){
    this.mapMarketBettype({id:0,marketid:this.mapmarket.id,bettypeid:this.mapbettypemarket.id});
  }

  mapMarketBettype(marketBettype : IMarketBettype){
    this.bettypeservice.mapMarketBettype(marketBettype)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.insertResultStatus(data)
          })
        })
  }

  mapTournamentBettype(tournamentBettype : ITournamentBettype){
    this.bettypeservice.mapTournamentBettype(tournamentBettype)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.insertResultStatus(data)
          })
        })
  }

  insertBettype(bettype : IBettype){
    this.bettypeservice.insertBettype(bettype)
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
    this.maptournament = {id:0,name:"Select Tournament"};
    this.mapbettypetournament = {id:0,name:"Select Bettype"};
    this.mapmarket = {id:0,name:"Select Market"};
    this.mapbettypemarket = {id:0,name:"Select Bettype"};
    this.disableButton();
    this.disableTournamentBettypeAssociationButton();
    this.disableMarketBettypeAssociationButton();
    window.scrollTo(0,0);
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
    this.marketservice.getMarkets().subscribe(data=>this.markets=data);
    this.tournamentservice.getTournamentBettypeInfo().subscribe(data=>this.tournamentbettypeinfos=data);
    this.marketservice.getMarketBettypeInfo().subscribe(data=>this.marketbettypeinfos=data);
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
