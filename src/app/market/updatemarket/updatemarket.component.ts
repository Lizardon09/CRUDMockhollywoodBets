import { Component, OnInit } from '@angular/core';
import { IMarket } from '../../services/market/market';
import { MarketService } from '../../services/market/market.service';

@Component({
  selector: 'app-updatemarket',
  templateUrl: './updatemarket.component.html',
  styleUrls: ['./updatemarket.component.css']
})
export class UpdatemarketComponent implements OnInit {

  markets : IMarket[] = [];
  successfullupdate = false;
  unsuccessfullupdate = false;
  disablebutton = true;
  selectedmarket : IMarket;

  constructor(private marketservice : MarketService) { }

  ngOnInit(): void {
    this.marketservice.getMarkets().subscribe(data=>this.markets=data);
  }

  disableButton(){
    if(this.selectedmarket.name){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  onNameKey(event){
    this.selectedmarket.name = event.target.value;
    this.disableButton();
  }

  startUpdate(){
    this.updateMarket(this.selectedmarket);
  }

  updateMarket(market : IMarket){
    this.marketservice.updateBettype(market)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.updateResultStatus(data)
          })
        })
  }

  selectMarket(market : any){
    this.selectedmarket = {...market};
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
