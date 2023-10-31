import { Component, OnInit } from '@angular/core';
import { Lekar } from '../model/lekar';
import { MenadzerService } from '../menadzer-servis/menadzer.service';
import { Router } from '@angular/router';
import { GeneralniService } from '../generalni-servis/generalni.service';

@Component({
  selector: 'app-menadzer-pregled-lekara',
  templateUrl: './menadzer-pregled-lekara.component.html',
  styleUrls: ['./menadzer-pregled-lekara.component.css']
})
export class MenadzerPregledLekaraComponent implements OnInit {

  constructor(private menadzerService : MenadzerService, private router : Router, private generalniService : GeneralniService) { }

  ngOnInit(): void {
      if(sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
      if (sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
      if (sessionStorage.length == 0) this.router.navigate([''])
    this.generalniService.dohvatiLekare().subscribe((lekari : Lekar[])=>{
      this.svi_lekari = lekari;
    })
  }
  svi_lekari : Lekar[];

  azuriraj(lekar : Lekar){
    sessionStorage.setItem('menadzer-lekar-azurira',JSON.stringify(lekar));
    this.router.navigate(['/menadzer/lekari/azuriranje_profila'])
  }

  obrisi(lekar_d : Lekar){
    const data = {
      lekar : lekar_d
    }
    this.menadzerService.obrisi_lekara(data).subscribe((resp)=>{
      location.reload();
    })
  }
    
}
