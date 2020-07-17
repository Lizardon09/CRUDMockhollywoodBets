import { Component, OnInit } from '@angular/core';
import { ISport } from '../../services/sport/sport';
import { SportService } from '../../services/sport/sport.service';

@Component({
  selector: 'app-deletesport',
  templateUrl: './deletesport.component.html',
  styleUrls: ['./deletesport.component.css']
})
export class DeletesportComponent implements OnInit {

  sports : ISport[] = [];
  successfulldelete = false;
  unsuccessfulldelete = false;

  constructor(private sportservice : SportService) { }

  ngOnInit(): void {
    this.sportservice.getSports().subscribe(data=>this.sports=data);
  }

  deleteSport(sport : any){
    this.sportservice.deleteSport(sport)      
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
    this.sportservice.getSports().subscribe(data=>this.sports=data);
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
