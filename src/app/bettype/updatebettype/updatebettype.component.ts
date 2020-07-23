import { Component, OnInit } from '@angular/core';
import { IBettype } from '../../services/bettype/bettype';
import { BettypeService } from '../../services/bettype/bettype.service';
import { ITournamentBettype } from '../../services/tournament/tournamentbettype';
import { ITournamentBettypeInfo } from '../../services/tournament/tournamentbettypeinfo';
import { IMarketBettype } from '../../services/market/marketbettype';
import { IMarketBettypeInfo } from '../../services/market/marketbettypeinfo';
import { TournamentService } from '../../services/tournament/tournament.service';
import { MarketService } from '../../services/market/market.service';
import { IMarket } from '../../services/market/market';
import { ITournament } from '../../services/tournament/tournament';

@Component({
  selector: 'app-updatebettype',
  templateUrl: './updatebettype.component.html',
  styleUrls: ['./updatebettype.component.css']
})
export class UpdatebettypeComponent implements OnInit {

  bettypes : IBettype[] = [];
  markets : IMarket[] = [];
  tournaments : ITournament[] = [];
  tournamentbettypeinfos : ITournamentBettypeInfo[] = [];
  marketbettypeinfos : IMarketBettypeInfo[] = [];
  successfullupdate = false;
  unsuccessfullupdate = false;
  disablebutton = true;
  selectedbettype : IBettype;
  selectedtournamentbettype : ITournamentBettypeInfo;
  selectedmarketbettype : IMarketBettypeInfo;

  constructor(private bettypeservice : BettypeService, private tournamentservice : TournamentService, private marketservice : MarketService) { }

  ngOnInit(): void {
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
    this.tournamentservice.getTournamentBettypeInfo().subscribe(data=>this.tournamentbettypeinfos=data);
    this.marketservice.getMarketBettypeInfo().subscribe(data=>this.marketbettypeinfos=data);
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
    this.marketservice.getMarkets().subscribe(data=>this.markets=data);
  }

  disableButton(){
    if((this.selectedbettype && this.selectedbettype.name) || this.selectedmarketbettype || this.selectedtournamentbettype){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  onNameKey(event){
    this.selectedbettype.name = event.target.value;
    this.disableButton();
  }

  onMarketKey(market){
    this.selectedmarketbettype.marketId = market.id;
    this.selectedmarketbettype.marketName = market.name;
    this.disableButton();
  }

  onBettypeMarketKey(bettype){
    this.selectedmarketbettype.bettypeid = bettype.id;
    this.selectedmarketbettype.bettypeName = bettype.name;
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

  startUpdate(){
    this.updateBettype(this.selectedbettype);
  }

  startMarketBettypeUpdate(){
    this.updateMarketBettype({id:this.selectedmarketbettype.id,marketid:this.selectedmarketbettype.marketId,bettypeid:this.selectedmarketbettype.bettypeid});
  }

  startTournamentBettypeUpdate(){
    this.updateTournamentBettype({id:this.selectedtournamentbettype.id,tournamentid:this.selectedtournamentbettype.tournamentId,bettypeid:this.selectedtournamentbettype.bettypeId});
  }
  
  updateBettype(bettype : IBettype){
    this.bettypeservice.updateBettype(bettype)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.updateResultStatus(data)
          })
        })
  }

  updateMarketBettype(marketbettype : IMarketBettype){
    this.marketservice.updateMarketBettype(marketbettype)
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

  selectBettype(bettype : any){
    this.selectedbettype = {...bettype};
    this.selectedtournamentbettype = null;
    this.selectedmarketbettype = null;
    window.scrollTo(0,0);
    this.disablebutton = true;
  }

  selectTournamentBettype(tournamentbettype : any){
    this.selectedtournamentbettype = {...tournamentbettype};
    this.selectedmarketbettype = null;
    this.selectedbettype = null;
    window.scrollTo(0,0);
    this.disablebutton = true;
  }

  selectMarketBettype(marketbettype : any){
    this.selectedmarketbettype = {...marketbettype};
    this.selectedmarketbettype.bettypeid = marketbettype.bettypeId;
    this.selectedbettype = null;
    this.selectedtournamentbettype = null;
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
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
    this.tournamentservice.getTournamentBettypeInfo().subscribe(data=>this.tournamentbettypeinfos=data);
    this.marketservice.getMarketBettypeInfo().subscribe(data=>this.marketbettypeinfos=data);
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
    this.marketservice.getMarkets().subscribe(data=>this.markets=data);
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
