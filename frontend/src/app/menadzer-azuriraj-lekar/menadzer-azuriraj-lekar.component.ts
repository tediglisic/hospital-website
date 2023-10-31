import { Component, OnInit } from '@angular/core';
import { Lekar } from '../model/lekar';
import { Router } from '@angular/router';
import { LekarService } from '../lekar-servis/lekar.service';
import { GeneralniService } from '../generalni-servis/generalni.service';
import { Specijalizacija } from '../model/specijalizacija';
import { MenadzerService } from '../menadzer-servis/menadzer.service';

@Component({
  selector: 'app-menadzer-azuriraj-lekar',
  templateUrl: './menadzer-azuriraj-lekar.component.html',
  styleUrls: ['./menadzer-azuriraj-lekar.component.css']
})
export class MenadzerAzurirajLekarComponent implements OnInit {

  constructor(private router : Router, private lekarService : LekarService, private generalniService : GeneralniService,
    private menadzerService : MenadzerService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('lekar')) this.router.navigate(['/menadzer/lekar'])
    if (sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
    if (sessionStorage.length == 0) this.router.navigate([''])
    this.menadzerService.dohvatiSpecijalizacije().subscribe((spec: Specijalizacija[]) => {
      this.specijalizacije = spec;
    })
    this.lekar = JSON.parse(sessionStorage.getItem('menadzer-lekar-azurira'))
    this.url = this.lekar.profilna_slika;
  }
  url : string;
  lekar : Lekar

  korisnicko_ime : string;
  ime : string;
  prezime : string;
  adresa : string;
  telefon : string;
  email : string;
  licenca : string;
  ogranak : string;
  specijalizacija;
  specijalizacije : Specijalizacija[];

  profilna_slika : File;

  //Poruke za polja
  poruka_korisnicko_ime : string;
  poruka_email : string;
  poruka_telefon : string;
  poruka_profilna_slika : string;
  poruka_greska : string;
 flag_slika = true;
  onFileSelected(event){
    this.profilna_slika = <File> event.target.files[0];
     this.flag_slika = true;
       if(this.profilna_slika){
         var reader = new FileReader();
         reader.readAsDataURL(this.profilna_slika)
         reader.onload = (e :any)=> {
           var image = new Image();
           image.src = <string>e.target.result;
           this.url = image.src;
           image.onload = () =>{
             var height = image.height;
             var width = image.width;
             if (height < 100 || width < 100 || height > 500 || width > 500) {
               this.poruka_profilna_slika = "Slika ne sme biti kraca od 100px i veca od 300px";
               this.flag_slika = false;
             }
           }}}
  }

  azuriraj_sliku(){
    if(!this.flag_slika) return;
    const data = {
      lekar : this.lekar,
      profilna_slika : this.url
    }
    this.lekarService.azuriraj_sliku(data).subscribe((resp)=>{
      this.lekar.profilna_slika = this.url
      sessionStorage.setItem('menadzer-lekar-azurira',JSON.stringify(this.lekar))
      this.router.navigate(['menadzer/lekari'])
    })
  }



  azuriraj_promene(){
    this.poruka_email = null;
    this.poruka_greska = null;
    this.poruka_korisnicko_ime = null;
    this.poruka_profilna_slika = null;
    this.poruka_telefon = null;
    if(this.korisnicko_ime){
      const data = {
        korisnicko_ime: this.korisnicko_ime
      }
      this.menadzerService.proveriKorisnickoIme(data).subscribe((respObject) => {
        if (respObject['message'] == 'postoji') {
          this.poruka_korisnicko_ime = "Korisnicko ime postoji. Unesite drugo.";
          return;
        } else if (respObject['message'] == 'odbijeno') {
          this.poruka_korisnicko_ime = "Korisnicko ime je odbijeno. Unesite drugi email.";
          return;
        } else { 
          if(this.email){
            const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(this.email)) {
              this.poruka_email = "Pogresan format za mejl."
              return;
            }
            this.menadzerService.proveriEmail(this.email).subscribe((respObject) => {
              if (respObject['message'] != 'ok') {
                this.poruka_email = "Email postoji ili je odbijeno. Unesite drugo.";
                return;
              } else {
                if(this.telefon) {
                  const telefonRegex =/^\+381-\d{2}-\d{3}-\d{4}$/;
                  if (!telefonRegex.test(this.telefon)) {
                    this.poruka_telefon = "Pogresan format za kontak telefon."
                    return;
                  }
                }
                if(!this.korisnicko_ime) this.korisnicko_ime = this.lekar.korisnicko_ime;
                if (!this.ime) this.ime = this.lekar.ime
                if (!this.prezime) this.prezime = this.lekar.prezime
                if (!this.adresa) this.adresa = this.lekar.adresa
                if (!this.telefon) this.telefon = this.lekar.kontakt_telefon
                if (!this.email) this.email = this.lekar.email
                if (!this.licenca) this.licenca = this.lekar.lekarska_licenca
                if(!this.ogranak) this.ogranak = this.lekar.ogranak_ordinacije
                if (!this.specijalizacija) this.specijalizacija = this.lekar.specijalizacija
            
                const data = {
                  korisnicko_ime :this.korisnicko_ime,
                  ogranak : this.ogranak,
                  lekar: this.lekar,
                  ime: this.ime,
                  prezime: this.prezime,
                  adresa: this.adresa,
                  telefon: this.telefon,
                  email: this.email,
                  licenca: this.licenca,
                  specijalizacija: this.specijalizacija
                }
                this.menadzerService.azuriraj_lekar_profil(data).subscribe((resp) => {
                  this.menadzerService.dohvati_lekara(data).subscribe((lekar : Lekar)=>{
                    sessionStorage.setItem('menadzer-lekar-azurira', JSON.stringify(lekar))
                    this.router.navigate(['menadzer/lekari'])
                  })
                })
              }})
          }else{
            if(this.telefon) {
              const telefonRegex =/^\+381-\d{2}-\d{3}-\d{4}$/;
              if (!telefonRegex.test(this.telefon)) {
                this.poruka_telefon = "Pogresan format za kontak telefon."
                return;
              }
            }
            if(!this.korisnicko_ime) this.korisnicko_ime = this.lekar.korisnicko_ime;
            if (!this.ime) this.ime = this.lekar.ime
            if (!this.prezime) this.prezime = this.lekar.prezime
            if (!this.adresa) this.adresa = this.lekar.adresa
            if (!this.telefon) this.telefon = this.lekar.kontakt_telefon
            if (!this.email) this.email = this.lekar.email
            if (!this.licenca) this.licenca = this.lekar.lekarska_licenca
            if(!this.ogranak) this.ogranak = this.lekar.ogranak_ordinacije
            if (!this.specijalizacija) this.specijalizacija = this.lekar.specijalizacija
        
            const data = {
              korisnicko_ime :this.korisnicko_ime,
              ogranak : this.ogranak,
              lekar: this.lekar,
              ime: this.ime,
              prezime: this.prezime,
              adresa: this.adresa,
              telefon: this.telefon,
              email: this.email,
              licenca: this.licenca,
              specijalizacija: this.specijalizacija
            }
            this.menadzerService.azuriraj_lekar_profil(data).subscribe((resp) => {
              this.menadzerService.dohvati_lekara(data).subscribe((lekar : Lekar)=>{
                sessionStorage.setItem('menadzer-lekar-azurira', JSON.stringify(lekar))
                this.router.navigate(['menadzer/lekari'])
              })
            })
          }
        }
    })
  }else{
    if(this.email){
      const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.email)) {
        this.poruka_email = "Pogresan format za mejl."
        return;
      }
      this.menadzerService.proveriEmail(this.email).subscribe((respObject) => {
        if (respObject['message'] != 'ok') {
          this.poruka_email = "Email postoji ili je odbijeno. Unesite drugo.";
          return;
        } else {
          if(this.telefon) {
            const telefonRegex =/^\+381-\d{2}-\d{3}-\d{4}$/;
            if (!telefonRegex.test(this.telefon)) {
              this.poruka_telefon = "Pogresan format za kontak telefon."
              return;
            }
          }
          if(!this.korisnicko_ime) this.korisnicko_ime = this.lekar.korisnicko_ime;
          if (!this.ime) this.ime = this.lekar.ime
          if (!this.prezime) this.prezime = this.lekar.prezime
          if (!this.adresa) this.adresa = this.lekar.adresa
          if (!this.telefon) this.telefon = this.lekar.kontakt_telefon
          if (!this.email) this.email = this.lekar.email
          if (!this.licenca) this.licenca = this.lekar.lekarska_licenca
          if(!this.ogranak) this.ogranak = this.lekar.ogranak_ordinacije
          if (!this.specijalizacija) this.specijalizacija = this.lekar.specijalizacija
      
          const data = {
            korisnicko_ime :this.korisnicko_ime,
            ogranak : this.ogranak,
            lekar: this.lekar,
            ime: this.ime,
            prezime: this.prezime,
            adresa: this.adresa,
            telefon: this.telefon,
            email: this.email,
            licenca: this.licenca,
            specijalizacija: this.specijalizacija
          }
          this.menadzerService.azuriraj_lekar_profil(data).subscribe((resp) => {
            this.menadzerService.dohvati_lekara(data).subscribe((lekar : Lekar)=>{
              sessionStorage.setItem('menadzer-lekar-azurira', JSON.stringify(lekar))
              this.router.navigate(['menadzer/lekari'])
            })
          })
        }})
    }else{
      if(this.telefon) {
        const telefonRegex =/^\+381-\d{2}-\d{3}-\d{4}$/;
        if (!telefonRegex.test(this.telefon)) {
          this.poruka_telefon = "Pogresan format za kontak telefon."
          return;
        }
      }
      if(!this.korisnicko_ime) this.korisnicko_ime = this.lekar.korisnicko_ime;
      if (!this.ime) this.ime = this.lekar.ime
      if (!this.prezime) this.prezime = this.lekar.prezime
      if (!this.adresa) this.adresa = this.lekar.adresa
      if (!this.telefon) this.telefon = this.lekar.kontakt_telefon
      if (!this.email) this.email = this.lekar.email
      if (!this.licenca) this.licenca = this.lekar.lekarska_licenca
      if(!this.ogranak) this.ogranak = this.lekar.ogranak_ordinacije
      if (!this.specijalizacija) this.specijalizacija = this.lekar.specijalizacija
  
      const data = {
        korisnicko_ime :this.korisnicko_ime,
        ogranak : this.ogranak,
        lekar: this.lekar,
        ime: this.ime,
        prezime: this.prezime,
        adresa: this.adresa,
        telefon: this.telefon,
        email: this.email,
        licenca: this.licenca,
        specijalizacija: this.specijalizacija
      }
      this.lekarService.azuriraj_profil(data).subscribe((resp) => {
        this.lekarService.dohvatiLekara(data).subscribe((lekar : Lekar)=>{
          sessionStorage.setItem('menadzer-lekar-azurira', JSON.stringify(lekar))
          this.router.navigate(['menadzer/lekari'])
        })
      })
    }
  }
    
}
}
