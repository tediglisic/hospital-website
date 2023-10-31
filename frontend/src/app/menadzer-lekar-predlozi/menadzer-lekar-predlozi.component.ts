import { Component, OnInit } from '@angular/core';
import { Pregled } from '../model/pregled';
import { PredlogPregled } from '../model/predlog_pregleda';
import { MenadzerService } from '../menadzer-servis/menadzer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-lekar-predlozi',
  templateUrl: './menadzer-lekar-predlozi.component.html',
  styleUrls: ['./menadzer-lekar-predlozi.component.css']
})
export class MenadzerLekarPredloziComponent implements OnInit {

  constructor(private menadzerService : MenadzerService, private router : Router) { }


  ngOnInit(): void {
    if (sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
    if (sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
    if (sessionStorage.length == 0) this.router.navigate([''])
    this.menadzerService.dohvatiNovePredloge().subscribe((predlozi : PredlogPregled[])=>{
      this.svi_predlozi = predlozi
    })
  }

  svi_predlozi : PredlogPregled [];
  
  prihvati_predlog(predlog : PredlogPregled){
    const data = { 
      naziv : predlog.naziv,
      specijalizacija : predlog.specijalizacija,
      trajanje : predlog.trajanje,
      cena : predlog.cena
    }
    this.menadzerService.prihvatiNovPredlog(data).subscribe((resp)=>{
      location.reload();
    })
  }

  odbij_predlog(predlog : PredlogPregled){
    const data = { 
      naziv : predlog.naziv,
      specijalizacija : predlog.specijalizacija
    }
    this.menadzerService.odbiNovPredlog(data).subscribe((resp)=>{
      location.reload();
    })
  }
}
