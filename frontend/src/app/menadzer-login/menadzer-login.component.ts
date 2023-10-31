import { Component, OnInit } from '@angular/core';
import { GeneralniService } from '../generalni-servis/generalni.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-login',
  templateUrl: './menadzer-login.component.html',
  styleUrls: ['./menadzer-login.component.css']
})
export class MenadzerLoginComponent implements OnInit {

  constructor(private generalniService : GeneralniService, private router : Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }
  poruka_greska : string;
  korisnicko_ime : string;
  lozinka : string;

  
  login(){
      if(!this.korisnicko_ime || !this.lozinka){
        this.poruka_greska = "Prazno polje !";
        return;
      }
      const data = {
        korisnicko_ime : this.korisnicko_ime,
        lozinka : this.lozinka
      }
      this.generalniService.login(data).subscribe((respObj)=>{
        if(respObj['message'] == 'Ne postoji!'){
          this.poruka_greska = "Pogresna email adresa ili pogresno uneta lozinka.";
          return;
        }
        if(respObj['message']=='pacijent' || respObj['message']=='lekar' ){
          this.poruka_greska = "Ovde se login samo menadzer.";
          return;
        }
        if(respObj['message']=='menadzer'){
          sessionStorage.setItem('menadzer_ime', this.korisnicko_ime);
          this.router.navigate(['/menadzer/pocetna']);
          return;
        }
      })
  
    }

  }

