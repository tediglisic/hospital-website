import { Component, OnInit } from '@angular/core';
import { Lekar } from '../model/lekar';
import { GeneralniService } from '../generalni-servis/generalni.service';

@Component({
  selector: 'app-neregistrovan-lekari',
  templateUrl: './neregistrovan-lekari.component.html',
  styleUrls: ['./neregistrovan-lekari.component.css']
})
export class NeregistrovanLekariComponent implements OnInit {

  constructor(private generalniService : GeneralniService) { }

  ngOnInit(): void {
    sessionStorage.clear();
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

  sortiraj_po : string;
  sortiraj_opcija : string;
  svi_lekari : Lekar [];
  backup : Lekar[];
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
  }


  pretrazi_ime : string;
  pretrazi_prezime : string;
  pretrazi_specijalizacija : string;

  pretrazi(){
    this.svi_lekari = this.backup;
    if(!this.pretrazi_ime && !this.pretrazi_prezime && !this.pretrazi_specijalizacija) return;
    //Sva polja uneta
    if(this.pretrazi_ime && this.pretrazi_prezime && this.pretrazi_specijalizacija){
      this.svi_lekari=this.svi_lekari.filter(lekar=>lekar.ime.includes(this.pretrazi_ime) || lekar.specijalizacija.includes(this.pretrazi_specijalizacija) 
      || lekar.prezime.includes(this.pretrazi_prezime) );
      return;
    }
    //Osim imena
    if(!this.pretrazi_ime && this.pretrazi_prezime && this.pretrazi_specijalizacija) {
      this.svi_lekari=this.svi_lekari.filter(lekar=>lekar.prezime.includes(this.pretrazi_prezime) || lekar.specijalizacija.includes(this.pretrazi_specijalizacija) );
      return;
    }
    //Osim prezimena
    if(this.pretrazi_ime && !this.pretrazi_prezime && this.pretrazi_specijalizacija){
      this.svi_lekari=this.svi_lekari.filter(lekar=>lekar.ime.includes(this.pretrazi_ime) || lekar.specijalizacija.includes(this.pretrazi_specijalizacija) );
      return;
    }
    //Osim specijalizacije
    if(this.pretrazi_ime && this.pretrazi_prezime && !this.pretrazi_specijalizacija){
      this.svi_lekari=this.svi_lekari.filter(lekar=>lekar.prezime.includes(this.pretrazi_prezime) || lekar.ime.includes(this.pretrazi_ime) );
      return;
    }
    //Samo ime
    if(this.pretrazi_ime && !this.pretrazi_prezime && !this.pretrazi_specijalizacija){
      
      this.svi_lekari=this.svi_lekari.filter(lekar=>lekar.ime.includes(this.pretrazi_ime) );
      return;
    }
    //Samo prezime
    if(!this.pretrazi_ime && this.pretrazi_prezime && !this.pretrazi_specijalizacija){
      this.svi_lekari=this.svi_lekari.filter(lekar=>lekar.prezime.includes(this.pretrazi_prezime) );
      return;
    }
    //Samo specijalizacija
    if(!this.pretrazi_ime && !this.pretrazi_prezime && this.pretrazi_specijalizacija){
      this.svi_lekari=this.svi_lekari.filter(lekar=>lekar.specijalizacija.includes(this.pretrazi_specijalizacija));
      return;
    }

  }

}
