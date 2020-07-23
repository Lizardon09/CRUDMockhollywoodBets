import { Component, OnInit } from '@angular/core';
import { IEvent } from '../../services/event/event';
import { EventService } from '../../services/event/event.service';
import { ITournament } from '../../services/tournament/tournament';
import { TournamentService } from '../../services/tournament/tournament.service';

@Component({
  selector: 'app-updateevent',
  templateUrl: './updateevent.component.html',
  styleUrls: ['./updateevent.component.css']
})
export class UpdateeventComponent implements OnInit {

  events : IEvent[] = [];
  tournaments : ITournament[] = [];
  successfullupdate = false;
  unsuccessfullupdate = false;
  disablebutton = true;
  selectedevent : IEvent;
  tournamentfield : ITournament = {id:0,name:"Select Tournament"};

  constructor(private eventservice : EventService, private tournamentservice : TournamentService) { }

  ngOnInit(): void {
    this.eventservice.getEvents().subscribe(data=>this.events=data);
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
  }

  disableButton(){
    if(this.selectedevent.name && this.selectedevent.tournamentId && this.selectedevent.date){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  onNameKey(event){
    this.selectedevent.name = event.target.value;
    this.disableButton();
  }

  onTournamentIdKey(tournament){
    this.selectedevent.tournamentId = tournament.id;
    this.tournamentfield = tournament;
    this.disableButton();
  }

  onDateKey(event){
    this.selectedevent.date = event.target.value;
    this.disableButton();
  }

  startUpdate(){
    this.updateEvent(this.selectedevent);
  }

  updateEvent(event : IEvent){
    this.eventservice.updateEvent(event)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.updateResultStatus(data)
          })
        })
  }

  selectEvent(event : any){
    this.selectedevent = {...event};
    this.tournamentfield = this.tournaments.find(x=>x.id==event.tournamentId)
    window.scrollTo(0,0);
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
    this.tournamentfield = {id:0,name:"Select Tournament"};
    this.eventservice.getEvents().subscribe(data=>this.events=data);
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
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
