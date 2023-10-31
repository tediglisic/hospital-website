import { Component, OnInit } from '@angular/core';
import { GeneralniService } from '../generalni-servis/generalni.service';
import { LekarService } from '../lekar-servis/lekar.service';
import { Router } from '@angular/router';
import { Lekar } from '../model/lekar';
import { Specijalizacija } from '../model/specijalizacija';
import { MenadzerService } from '../menadzer-servis/menadzer.service';
import { PacijentService } from '../pacijent-servis/pacijent.service';

@Component({
  selector: 'app-lekar-azuriraj',
  templateUrl: './lekar-azuriraj.component.html',
  styleUrls: ['./lekar-azuriraj.component.css']
})
export class LekarAzurirajComponent implements OnInit {

  constructor(private generalniService: GeneralniService, private lekarService: LekarService, private router: Router,
    private menadzerService: MenadzerService,private pacijentService : PacijentService) { }

  ngOnInit(): void {
    this.lekar = JSON.parse(sessionStorage.getItem('lekar'));
    if (!this.lekar) {
      if (sessionStorage.getItem('menadzer_ime')) this.router.navigate(['/menadzer/pocetna'])
      if (sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
      if (sessionStorage.length == 0) this.router.navigate([''])
    }
    this.lekar = JSON.parse(sessionStorage.getItem('lekar'))
    this.url = this.lekar.profilna_slika;
    this.menadzerService.dohvatiSpecijalizacije().subscribe((spec: Specijalizacija[]) => {
      this.specijalizacije = spec;
    })
  }

  ime: string;
  prezime: string;
  adresa: string;
  telefon: string;
  email: string;
  licenca: string;
  specijalizacija: string;
  specijalizacije: Specijalizacija[];

  profilna_slika: File;
  lekar: Lekar;
  url: string;

  //Poruke za polja
  poruka_email: string;
  poruka_telefon: string;
  poruka_profilna_slika: string;
  flag_slika = true;
  izabranaSlika(event) {
    this.profilna_slika = <File>event.target.files[0];
    this.flag_slika = true;
    if (this.profilna_slika) {
      var reader = new FileReader();
      reader.readAsDataURL(this.profilna_slika)
      reader.onload = (e: any) => {
        var image = new Image();
        image.src = <string>e.target.result;
        this.url = image.src;
        image.onload = () => {
          if (image.height < 100 || image.width < 100 || image.height > 500 || image.width > 500) {
            this.poruka_profilna_slika = "Slika ne sme biti kraca od 100px i veca od 300px";
            this.flag_slika = false;
          }
        }
      }
    }
  }

  azuriraj_sliku() {
    if(!this.flag_slika) return;
    const data = {
      lekar: this.lekar,
      profilna_slika: this.url
    }
    this.lekarService.azuriraj_sliku(data).subscribe((resp) => {
      this.lekar.profilna_slika = this.url
      sessionStorage.setItem('lekar', JSON.stringify(this.lekar))
      this.router.navigate(['lekar/pocetna'])
    })
  }

  azuriraj_promene() {
    if (this.telefon) {
      const telefonRegex = /^\+381-\d{2}-\d{3}-\d{4}$/;
      if (!telefonRegex.test(this.telefon)) {
        this.poruka_telefon = "Pogresan format za kontak telefon."
        return;
      }
    }
    if (!this.ime) this.ime = this.lekar.ime
    if (!this.prezime) this.prezime = this.lekar.prezime
    if (!this.adresa) this.adresa = this.lekar.adresa
    if (!this.telefon) this.telefon = this.lekar.kontakt_telefon
    if (!this.email) this.email = this.lekar.email
    if (!this.licenca) this.licenca = this.lekar.lekarska_licenca
    if (!this.specijalizacija) this.specijalizacija = this.lekar.specijalizacija

    const data = {
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
        sessionStorage.setItem('lekar', JSON.stringify(lekar))
        this.router.navigate(['lekar/pocetna'])
      })
    })
  }
     
  }


