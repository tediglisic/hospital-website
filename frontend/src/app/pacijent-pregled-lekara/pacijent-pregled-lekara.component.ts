import { Component, OnInit } from '@angular/core';
import { Lekar } from '../model/lekar';
import { GeneralniService } from '../generalni-servis/generalni.service';
import { Router } from '@angular/router';
import { Pacijent } from '../model/pacijent';
import { LekarService } from '../lekar-servis/lekar.service';

@Component({
  selector: 'app-pacijent-pregled-lekara',
  templateUrl: './pacijent-pregled-lekara.component.html',
  styleUrls: ['./pacijent-pregled-lekara.component.css']
})
export class PacijentPregledLekaraComponent implements OnInit {

  constructor(private generalniService : GeneralniService, private router : Router,private lekarService : LekarService) { }

  pacijent : Pacijent;
  ngOnInit(): void {
    this.pacijent = JSON.parse(sessionStorage.getItem('pacijent'))
    if(this.pacijent==null){
      if(sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
      if(sessionStorage.getItem('menadzer_ime')) this.router.navigate(['/menadzer/pocetna'])
      this.router.navigate(['']);
    }
    this.generalniService.dohvatiLekare().subscribe((lekari : Lekar[])=>{
      lekari.forEach(element => {
        if(element.profilna_slika==null){
          element.profilna_slika = "/assets/lekar.webp";
        }
      });
      this.svi_lekari = lekari;
      this.backup = lekari;
    })
  }

  svi_lekari : Lekar[];
  backup : Lekar[];
  sortiraj_po : string;
  sortiraj_opcija : string;

  sortiraj(){
    if(this.sortiraj_po == "ime"){
      if(this.sortiraj_opcija=="opadajuce" || this.sortiraj_opcija==null){
        this.svi_lekari.sort((lekar1,lekar2)=>{
          if(lekar1.ime < lekar2.ime ){
            return -1;
          }
    
          if(lekar1.ime > lekar2.ime) return 1;
          return 0;
        })
      }else{
        this.svi_lekari.sort((lekar1,lekar2)=>{
          if(lekar1.ime > lekar2.ime ){
            return -1;
          }
    
          if(lekar1.ime < lekar2.ime) return 1;
          return 0;
        })
      }
    }

    if(this.sortiraj_po == "prezime"){
      if(this.sortiraj_opcija=="opadajuce" || this.sortiraj_opcija==null){
        this.svi_lekari.sort((lekar1,lekar2)=>{
          if(lekar1.prezime < lekar2.prezime ){
            return -1;
          }
    
          if(lekar1.prezime > lekar2.prezime) return 1;
          return 0;
        })
      }else{
        this.svi_lekari.sort((lekar1,lekar2)=>{
          if(lekar1.prezime > lekar2.prezime ){
            return -1;
          }
    
          if(lekar1.prezime < lekar2.prezime) return 1;
          return 0;
        })
      }
    }

    if(this.sortiraj_po == "specijalizacija"){
      if(this.sortiraj_opcija=="opadajuce" || this.sortiraj_opcija==null){
        this.svi_lekari.sort((lekar1,lekar2)=>{
          if(lekar1.specijalizacija < lekar2.specijalizacija ){
            return -1;
          }
    
          if(lekar1.prezime > lekar2.prezime) return 1;
          return 0;
        })
      }else{
        this.svi_lekari.sort((lekar1,lekar2)=>{
          if(lekar1.specijalizacija > lekar2.specijalizacija){
            return -1;
          }
    
          if(lekar1.specijalizacija < lekar2.specijalizacija) return 1;
          return 0;
        })
      }
    }

    if(this.sortiraj_po == "ogranak"){
      if(this.sortiraj_opcija=="opadajuce" || this.sortiraj_opcija==null){
        this.svi_lekari.sort((lekar1,lekar2)=>{
          if(lekar1.ogranak_ordinacije < lekar2.ogranak_ordinacije ){
            return -1;
          }
    
          if(lekar1.ogranak_ordinacije > lekar2.ogranak_ordinacije) return 1;
          return 0;
        })
      }else{
        this.svi_lekari.sort((lekar1,lekar2)=>{
          if(lekar1.ogranak_ordinacije > lekar2.ogranak_ordinacije){
            return -1;
          }
    
          if(lekar1.ogranak_ordinacije < lekar2.ogranak_ordinacije) return 1;
          return 0;
        })
      }
    }
  }

  pretrazi_ime : string;
  pretrazi_prezime : string;
  pretrazi_specijalizacija : string;
  pretrazi_ogranak : string;

  pretrazi(){
    this.svi_lekari = this.backup;
    if(!this.pretrazi_ime && !this.pretrazi_prezime && !this.pretrazi_specijalizacija && !this.pretrazi_ogranak) return;
    //Sva polja uneta
    this.svi_lekari=this.svi_lekari.filter(lekar=>lekar.ime.includes(this.pretrazi_ime) || lekar.specijalizacija.includes(this.pretrazi_specijalizacija) 
      || lekar.prezime.includes(this.pretrazi_prezime) || lekar.ogranak_ordinacije.includes(this.pretrazi_ogranak) );
      return;
  
  }

  pogledaj_profil(lekar : Lekar){
    const data = {
      lekar : lekar,
      specijalizacija : lekar.specijalizacija
    }
    this.lekarService.azuriraj_svoje_preglede(data).subscribe((lekar_nov : Lekar)=>{
      sessionStorage.setItem('profil_lekar',JSON.stringify(lekar_nov));
      this.router.navigate(['pacijent/lekari/lekar_profil']);
    })
    
  }

}
