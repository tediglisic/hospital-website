import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-pocetna',
  templateUrl: './menadzer-pocetna.component.html',
  styleUrls: ['./menadzer-pocetna.component.css']
})
export class MenadzerPocetnaComponent implements OnInit {

  constructor(private router : Router) { }

  ime : string;
  prezime : string;
  tip:string;

  ngOnInit(): void {
    
    if(sessionStorage.getItem('lekar')){
      this.router.navigate(['/lekar/pocetna'])
    }
    if(sessionStorage.getItem('pacijent')){
      this.router.navigate(['/lekar/pocetna'])
    }
    if(sessionStorage.length==0){
      this.router.navigate([''])
    }

    this.ime = sessionStorage.getItem('menadzer_ime');
  }

 
}
