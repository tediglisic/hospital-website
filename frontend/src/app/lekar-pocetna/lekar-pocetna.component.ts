import { Component, OnInit } from '@angular/core';
import { Pregled } from '../model/pregled';
import { Lekar } from '../model/lekar';
import { Router } from '@angular/router';
import { LekarService } from '../lekar-servis/lekar.service';

@Component({
  selector: 'app-lekar-pocetna',
  templateUrl: './lekar-pocetna.component.html',
  styleUrls: ['./lekar-pocetna.component.css']
})
export class LekarPocetnaComponent implements OnInit {

  constructor(private router : Router, private lekarService : LekarService) { }

  ngOnInit(): void {
    this.lekar = JSON.parse(sessionStorage.getItem('lekar'));
    if(!this.lekar){
      if(sessionStorage.getItem('menadzer_ime')) this.router.navigate(['/menadzer/pocetna'])
      if(sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
      if(sessionStorage.length==0) this.router.navigate([''])
    }
    if(this.lekar.profilna_slika==null){
      this.lekar.profilna_slika = "/assets/lekar.webp";
    }

    const data = {
      specijalizacija : this.lekar.specijalizacija,
      lekar : this.lekar
    }
    this.lekarService.dohvati_preglede(data).subscribe((pregledi : Pregled[])=>{
      this.svi_pregledi = pregledi;

      this.lekarService.azuriraj_svoje_preglede(data).subscribe((lekar : Lekar)=>{
        this.lekar = lekar
        sessionStorage.setItem("lekar",JSON.stringify(this.lekar))
      })
    })
  }

  lekar : Lekar;
  svi_pregledi : Pregled[];
  poruka_pregled : String;

  azuriraj(){
    this.router.navigate(['/lekar/pocetna/azuriranje_profila'])
  }

  promeni_lozinku(){
    this.router.navigate(['/lekar/pocetna/promena_lozinke']);
  }

  izaberi_preglede(){
    let odabrani_pregledi : Pregled [] = [];
    const svi_pregledii =<HTMLInputElement><unknown> document.querySelectorAll('input[name=vehicle1]:checked');
    for(let i = 0; i < this.svi_pregledi.length;i++){
        if(svi_pregledii[i] != null){
          odabrani_pregledi.push(this.svi_pregledi[svi_pregledii[i].id]);
        }
    }
    const data = {
      korisnicko_ime : this.lekar.korisnicko_ime,
      izabrani_pregledi : odabrani_pregledi
    }
     this.lekarService.izaberi_preglede(data).subscribe((respObj : Pregled[])=>{
        this.lekar.pregledi = respObj;
        sessionStorage.setItem("lekar",JSON.stringify(this.lekar))
        this.poruka_pregled = 'Uspesno ste izabrali svoje preglede.';      
     })
  }

  

}
