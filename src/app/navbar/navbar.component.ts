import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes , Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route : ActivatedRoute,
              private router : Router
            ) { }

  ngOnInit(): void {
  }

  goToRoute(url : string){
    this.router.navigateByUrl(url);
  }

}
