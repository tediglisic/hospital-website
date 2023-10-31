import { Component, OnInit } from '@angular/core';
import { Pacijent } from '../model/pacijent';
import { MenadzerService } from '../menadzer-servis/menadzer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-pregled-pacijenata',
  templateUrl: './menadzer-pregled-pacijenata.component.html',
  styleUrls: ['./menadzer-pregled-pacijenata.component.css']
})
export class MenadzerPregledPacijenataComponent implements OnInit {

  constructor(private menadzerService : MenadzerService, private router : Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
    if (sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
    if (sessionStorage.length == 0) this.router.navigate([''])
    this.menadzerService.dohvatiPacijenteP().subscribe((pacijenti : Pacijent[])=>{
      this.svi_pacijenti = pacijenti;
    })
  }

  svi_pacijenti : Pacijent[];

  azuriraj(pacijent : Pacijent){
    sessionStorage.setItem('menadzer-pacijent-azurira',JSON.stringify(pacijent));
    this.router.navigate(['/menadzer/pacijenti/azuriranje_profila'])

  }

  obrisi(pacijent : Pacijent){
    const data = {
      pacijent : pacijent
    }
    this.menadzerService.obrisi_pacijenta(data).subscribe((resp)=>{
      location.reload();
    })
  }
}

