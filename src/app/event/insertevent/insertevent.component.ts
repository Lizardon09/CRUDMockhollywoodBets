import { Component, OnInit } from '@angular/core';
import { IEvent } from '../../services/event/event';
import { EventService } from '../../services/event/event.service';
import { ITournament } from '../../services/tournament/tournament';
import { TournamentService } from '../../services/tournament/tournament.service';

@Component({
  selector: 'app-insertevent',
  templateUrl: './insertevent.component.html',
  styleUrls: ['./insertevent.component.css']
})
export class InserteventComponent implements OnInit {

  events : IEvent[] = [];
  tournaments : ITournament[] = [];
  successfulinsert = false;
  unsuccessfullinsert = false;
  disablebutton = true;
  tournamentIdfield : number = null;
  namefield : string = "";
  datefield : Date;
  tournamentfield : ITournament = {id:0,name:"Select Tournament"};

  constructor(private eventservice : EventService, private tournamentservice : TournamentService) { }

  ngOnInit(): void {
    this.eventservice.getEvents().subscribe(data=>this.events=data);
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
  }

  disableButton(){
    if(this.namefield && this.tournamentfield.id>0 && this.datefield){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  onTournamentIdKey(tournament){
    this.tournamentfield = tournament;
    this.disableButton();
  }

  onNameKey(event){
    this.namefield = event.target.value;
    this.disableButton();
  }

  onDateKey(event){
    this.datefield = event.target.value;
    console.log(this.datefield);
    this.disableButton();
  }

  startInsert(){
    this.insertEvent({
      tournamentId:this.tournamentfield.id,
      id:0,
      name:this.namefield,
      date:this.datefield
    });
  }

  insertEvent(event : IEvent){
    console.log(event);
    this.eventservice.insertEvent(event)
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
    this.tournamentIdfield = -1;
    this.namefield = "";
    this.datefield = null;
    this.tournamentfield = {id:0,name:"Select Tournament"};
    this.disableButton();
    window.scrollTo(0,0);
    this.eventservice.getEvents().subscribe(data=>this.events=data);
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
