import { Component, OnInit } from '@angular/core';
import { ITournament } from '../../services/tournament/tournament';
import { TournamentService } from '../../services/tournament/tournament.service';

@Component({
  selector: 'app-updatetournament',
  templateUrl: './updatetournament.component.html',
  styleUrls: ['./updatetournament.component.css']
})
export class UpdatetournamentComponent implements OnInit {

  tournaments : ITournament[] = [];
  successfullupdate = false;
  unsuccessfullupdate = false;
  disablebutton = true;
  selectedtournament : ITournament;

  constructor(private tournamentservice : TournamentService) { }

  ngOnInit(): void {
    this.tournamentservice.getTournaments().subscribe(data=>this.tournaments=data);
  }

  disableButton(){
    if(this.selectedtournament.name){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  onNameKey(event){
    this.selectedtournament.name = event.target.value;
    this.disableButton();
  }

  startUpdate(){
    this.updateTournament(this.selectedtournament);
  }

  updateTournament(tournament : ITournament){
    this.tournamentservice.updateTournament(tournament)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.updateResultStatus(data)
          })
        })
  }

  selectTournament(tournament : any){
    this.selectedtournament = {...tournament};
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
