import { Component, OnInit } from '@angular/core';
import { Pacijent } from '../model/pacijent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacijent-pocetna',
  templateUrl: './pacijent-pocetna.component.html',
  styleUrls: ['./pacijent-pocetna.component.css']
})
export class PacijentPocetnaComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.pacijent = JSON.parse(sessionStorage.getItem("pacijent"));
    if(this.pacijent==null){
      if(sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
      if(sessionStorage.getItem('menadzer_ime')) this.router.navigate(['/menadzer/pocetna'])
      this.router.navigate(['']);
    }
    if(this.pacijent.profilna_slika==null){
      this.pacijent.profilna_slika = "/assets/user_icon.jpg";
    }
  }

  pacijent : Pacijent;

  promeniLozinku(pacijent : Pacijent){
    this.router.navigate(['/pacijent/pocetna/promena_lozinke']);
  }

  azuriraj(pacijent : Pacijent){
    this.router.navigate(['/pacijent/pocetna/azuriranje_profila']);
  }

}
