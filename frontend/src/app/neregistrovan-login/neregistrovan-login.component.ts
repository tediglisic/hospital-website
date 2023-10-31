import { Component, OnInit } from '@angular/core';
import { GeneralniService } from '../generalni-servis/generalni.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-neregistrovan-login',
  templateUrl: './neregistrovan-login.component.html',
  styleUrls: ['./neregistrovan-login.component.css']
})
export class NeregistrovanLoginComponent implements OnInit {

  constructor(private generalniService : GeneralniService, private router : Router) { }

  ngOnInit(): void {
    sessionStorage.clear()
  }

  poruka_greska : string;
  korisnicko_ime : string;
  lozinka : string;

  
  login(){
    if(!this.korisnicko_ime || !this.lozinka){
      this.poruka_greska = "Prazno polje !";
      return;
    }
    console.log(this.lozinka)
    const data = {
      korisnicko_ime : this.korisnicko_ime,
      lozinka : this.lozinka
    }
    this.generalniService.login(data).subscribe((respObj)=>{
      if(respObj['message'] == 'Ne postoji!'){
        this.poruka_greska = "Pogresna email adresa,pogresno uneta lozinka,registrovani korisnik nije odobren.";
        return;
      }
      if(respObj['message']=='pacijent'){
        sessionStorage.setItem('pacijent', JSON.stringify( respObj['pacijent']));
        this.router.navigate(['/pacijent/pocetna']);
        return;
      }
      if(respObj['message']=='lekar'){
        sessionStorage.setItem('lekar',JSON.stringify(respObj['lekar']));
        this.router.navigate(['/lekar/pocetna']);
        return;
      }
      if(respObj['message']=='menadzer'){
        this.poruka_greska = "Zao mi je ali menadzer se ne loguje na ovoj stranici.";
        return;
      }
    })

  }

}
