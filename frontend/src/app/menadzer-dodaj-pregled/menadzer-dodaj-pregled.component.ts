import { Component, OnInit } from '@angular/core';
import { MenadzerService } from '../menadzer-servis/menadzer.service';
import { Specijalizacija } from '../model/specijalizacija';

@Component({
  selector: 'app-menadzer-dodaj-pregled',
  templateUrl: './menadzer-dodaj-pregled.component.html',
  styleUrls: ['./menadzer-dodaj-pregled.component.css']
})
export class MenadzerDodajPregledComponent implements OnInit {

  constructor(private menadzerService : MenadzerService) { }

  ngOnInit(): void {
    this.menadzerService.dohvatiSpecijalizacije().subscribe((spec : Specijalizacija[])=>{
      this.specijalizacije = spec
    })
  }

  naziv_pregleda : String;
  trajanje_pregleda : String;
  cena_pregleda : String;
  poruka_uspeh : String;
  poruka_greska : String;
  izabrana_specijalizacija : String;
  specijalizacije : Specijalizacija[];

  flag : boolean = false;

  provera_predlog(){
    const data = {
      naziv_pregleda : this.naziv_pregleda,
      specijalizacija : this.izabrana_specijalizacija
    }
    this.menadzerService.proveriPregled(data).subscribe((resp)=>{
      if(resp['message']=='postoji'){
        console.log("ovde");
        this.flag = true;
      }
    })
  }

  dodaj_pregled(){
    this.flag = false;
    this.provera_predlog();
    if(this.flag){
      this.poruka_greska = "Pregled postoji u vasoj specijalizaciji.";
      return;
    }
    if(this.trajanje_pregleda == null) this.trajanje_pregleda = "30";
    if(this.cena_pregleda == null) this.cena_pregleda = "0"
    const data = {
      naziv_pregleda : this.naziv_pregleda,
      cena_pregleda : this.cena_pregleda,
      trajanje_pregleda : this.trajanje_pregleda,
      specijalizacija : this.izabrana_specijalizacija
    }

    this.menadzerService.dodajPregled(data).subscribe((resp)=>{
      this.poruka_uspeh = "Uspesno ste dodali pregled";
    })
  }

}
