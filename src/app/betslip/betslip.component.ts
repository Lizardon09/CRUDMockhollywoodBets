import { Component, OnInit } from '@angular/core';
import {IBetSlip} from '../services/betslip/betslip';
import {IBetInfo} from '../services/betslip/betinfo';
import {BetslipService} from '../services/betslip/betslip.service';

@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.css']
})
export class BetslipComponent implements OnInit {

  betslips : IBetSlip[] = [];
  bets : IBetInfo[] = [];

  constructor(private betslipservice : BetslipService) { }

  ngOnInit(): void {
    this.betslipservice.getBetSlips().subscribe(data=>this.betslips=data);
  }

  selectBetSlip(betslip : any){
    this.betslipservice.getBetsByBetSlip(betslip.id).subscribe(data=>{this.bets=data;console.log(data)});
  }

}
