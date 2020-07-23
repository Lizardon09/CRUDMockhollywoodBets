import { Component, OnInit } from '@angular/core';
import { ITournament } from '../../services/tournament/tournament';
import { TournamentService } from '../../services/tournament/tournament.service';
import { ITournamentBettypeInfo } from '../../services/tournament/tournamentbettypeinfo';
import { ITournamentSCInfo } from '../../services/tournament/tournamentscinfo';

@Component({
  selector: 'app-deletetournament',
  templateUrl: './deletetournament.component.html',
  styleUrls: ['./deletetournament.component.css']
})
export class DeletetournamentComponent implements OnInit {

  tournaments : ITournament[] = [];
  tournamentbettypeinfos : ITournamentBettypeInfo[] = [];
  tournamentscinfos : ITournamentSCInfo[] = [];
  successfulldelete = false;
  unsuccessfulldelete = false;

  constructor(private tournamentservice : TournamentService) { }

  ngOnInit(): void {
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
    this.tournamentservice.getTournamentBettypeInfo().subscribe(data=>this.tournamentbettypeinfos=data);
    this.tournamentservice.getTournamentSCInfo().subscribe(data=>this.tournamentscinfos=data);
  }

  deleteTournament(tournament : any){
    this.tournamentservice.deleteTournament(tournament)      
      .subscribe(data=>{
        console.log(data);
        this.waitForOneSecond().then((value)=>{
          this.deleteResultStatus(data)
        })
      });
  }

  deleteTournamentBettype(tournamentbettypeinfo : any){
    this.tournamentservice.deleteTournamentBettype(tournamentbettypeinfo)      
    .subscribe(data=>{
      console.log(data);
      this.waitForOneSecond().then((value)=>{
        this.deleteResultStatus(data)
      })
    });
  }

  deleteTournamentSC(tournamentscinfo : any){
    this.tournamentservice.deleteTournamentSC(tournamentscinfo)      
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
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
    this.tournamentservice.getTournamentBettypeInfo().subscribe(data=>this.tournamentbettypeinfos=data);
    this.tournamentservice.getTournamentSCInfo().subscribe(data=>this.tournamentscinfos=data);
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
