import { Component, OnInit } from '@angular/core';
import { IBettype } from '../../services/bettype/bettype';
import { BettypeService } from '../../services/bettype/bettype.service';
import { ITournamentBettypeInfo } from '../../services/tournament/tournamentbettypeinfo';
import { IMarketBettypeInfo } from '../../services/market/marketbettypeinfo';
import { TournamentService } from '../../services/tournament/tournament.service';
import { MarketService } from '../../services/market/market.service';

@Component({
  selector: 'app-deletebettype',
  templateUrl: './deletebettype.component.html',
  styleUrls: ['./deletebettype.component.css']
})
export class DeletebettypeComponent implements OnInit {

  bettypes : IBettype[] = [];
  tournamentbettypeinfos : ITournamentBettypeInfo[] = [];
  marketbettypeinfos : IMarketBettypeInfo[] = [];
  successfulldelete = false;
  unsuccessfulldelete = false;

  constructor(private bettypeservice : BettypeService, private tournamentservice : TournamentService, private marketservice : MarketService) { }

  ngOnInit(): void {
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
    this.tournamentservice.getTournamentBettypeInfo().subscribe(data=>this.tournamentbettypeinfos=data);
    this.marketservice.getMarketBettypeInfo().subscribe(data=>this.marketbettypeinfos=data);
  }

  deleteBettype(bettype : any){
    this.bettypeservice.deleteBettype(bettype)      
      .subscribe(data=>{
        console.log(data);
        this.waitForOneSecond().then((value)=>{
          this.deleteResultStatus(data)
        })
      });
  }

  deleteMarketBettype(marketbettypeinfo : any){
    this.bettypeservice.deleteMarketBettype(marketbettypeinfo)      
    .subscribe(data=>{
      console.log(data);
      this.waitForOneSecond().then((value)=>{
        this.deleteResultStatus(data)
      })
    });
  }

  deleteTournamentBettype(tournamentbettypeinfo : any){
    this.bettypeservice.deleteTournamentBettype(tournamentbettypeinfo)      
    .subscribe(data=>{
      console.log(data);
      this.waitForOneSecond().then((value)=>{
        this.deleteResultStatus(data)
      })
    });
  }

  deleteResultStatus(data : any){
    if(data.status=="Success"){
      this.successfulldelete = true;
      this.unsuccessfulldelete = false;
    }
    else if(data.status=="Cancelled"){
      return;
    }
    else{
      this.unsuccessfulldelete = true;
      this.successfulldelete = false;
    }
    window.scrollTo(0,0);
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
    this.tournamentservice.getTournamentBettypeInfo().subscribe(data=>this.tournamentbettypeinfos=data);
    this.marketservice.getMarketBettypeInfo().subscribe(data=>this.marketbettypeinfos=data);
  }

  closeSuccess(){
    this.successfulldelete = false;
    this.unsuccessfulldelete = false;
  }

  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("I promise to return after one second!");
      }, 300);
    });
  }

}
