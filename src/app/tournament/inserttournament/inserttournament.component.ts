import { Component, OnInit } from '@angular/core';
import { ITournament } from '../../services/tournament/tournament';
import { TournamentService } from '../../services/tournament/tournament.service';

@Component({
  selector: 'app-inserttournament',
  templateUrl: './inserttournament.component.html',
  styleUrls: ['./inserttournament.component.css']
})
export class InserttournamentComponent implements OnInit {

  tournaments : ITournament[] = [];
  successfulinsert = false;
  unsuccessfullinsert = false;
  disablebutton = true;
  namefield : string = "";

  constructor(private tournamentservice : TournamentService) { }

  ngOnInit(): void {
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
  }

  disableButton(){
    if(this.namefield){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  onNameKey(event){
    this.namefield = event.target.value;
    this.disableButton();
  }

  startInsert(){
    this.insertTournament({id:0,name:this.namefield});
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
    this.disableButton();
    window.scrollTo(0,0);
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
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
