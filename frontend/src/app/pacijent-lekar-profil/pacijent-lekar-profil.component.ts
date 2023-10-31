import { Component, OnInit } from '@angular/core';
import { Lekar } from '../model/lekar';
import { Pregled } from '../model/pregled';
import { Router } from '@angular/router';
import { Pacijent } from '../model/pacijent';

@Component({
  selector: 'app-pacijent-lekar-profil',
  templateUrl: './pacijent-lekar-profil.component.html',
  styleUrls: ['./pacijent-lekar-profil.component.css']
})
export class PacijentLekarProfilComponent implements OnInit {

  constructor(private router : Router) { }

  pacijent : Pacijent;
  ngOnInit(): void {
    this.pacijent = JSON.parse(sessionStorage.getItem('pacijent'))
    if(this.pacijent==null){
      if(sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
      if(sessionStorage.getItem('menadzer_ime')) this.router.navigate(['/menadzer/pocetna'])
      this.router.navigate(['']);
    }
    this.lekar = JSON.parse(sessionStorage.getItem('profil_lekar'));
  }

  lekar : Lekar;

  zakazi_forma(pregled : Pregled){
    sessionStorage.setItem('zakazan_pregled',JSON.stringify(pregled));
    this.router.navigate(['pacijent/lekari/zakazi_pregled_forma']);
  }

  zakazi_kalendar(pregled : Pregled){
    sessionStorage.setItem('zakazan_pregled',JSON.stringify(pregled));
    this.router.navigate(['pacijent/lekari/zakazi_pregled_forma'])
  }

}
