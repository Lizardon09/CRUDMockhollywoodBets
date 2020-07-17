import { Component, OnInit } from '@angular/core';
import { ITournament } from '../../services/tournament/tournament';
import { TournamentService } from '../../services/tournament/tournament.service';

@Component({
  selector: 'app-deletetournament',
  templateUrl: './deletetournament.component.html',
  styleUrls: ['./deletetournament.component.css']
})
export class DeletetournamentComponent implements OnInit {

  tournaments : ITournament[] = [];
  successfulldelete = false;
  unsuccessfulldelete = false;

  constructor(private tournamentservice : TournamentService) { }

  ngOnInit(): void {
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
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
