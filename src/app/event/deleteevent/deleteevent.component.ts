import { Component, OnInit } from '@angular/core';
import { IEvent } from '../../services/event/event';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-deleteevent',
  templateUrl: './deleteevent.component.html',
  styleUrls: ['./deleteevent.component.css']
})
export class DeleteeventComponent implements OnInit {

  events : IEvent[] = [];
  successfulldelete = false;
  unsuccessfulldelete = false;

  constructor(private eventservice : EventService) { }

  ngOnInit(): void {
    this.eventservice.getEvents().subscribe(data=>this.events=data);
  }
  
  deleteEvent(event : any){
    this.eventservice.deleteEvent(event)      
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
    this.eventservice.getEvents().subscribe(data=>this.events=data);
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
