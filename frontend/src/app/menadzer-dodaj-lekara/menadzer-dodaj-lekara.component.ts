import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenadzerService } from '../menadzer-servis/menadzer.service';
import { Specijalizacija } from '../model/specijalizacija';
import { GeneralniService } from '../generalni-servis/generalni.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-dodaj-lekara',
  templateUrl: './menadzer-dodaj-lekara.component.html',
  styleUrls: ['./menadzer-dodaj-lekara.component.css']
})
export class MenadzerDodajLekaraComponent implements OnInit {

  constructor(private http: HttpClient, private menadzerService: MenadzerService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
    if (sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
    if (sessionStorage.length == 0) this.router.navigate([''])
    this.pocetnoStanje();
    this.poruka_uspesno_registrovan = null;
    this.menadzerService.dohvatiSpecijalizacije().subscribe((data: Specijalizacija[]) => {
      this.specijalizacije = data;
    })
  }

  specijalizacije: Specijalizacija[];

  korisnicko_ime: string;
  lozinka: string;
  potvrda_lozinke: string;
  ime: string;
  prezime: string;
  adresa: string;
  telefon: string;
  email: string;
  lekarska_licenca: string;
  ogranak_ordinacije: string;
  izabrana_specijalizacija: string;

  profilna_slika: File;

  //Poruke za polja
  poruka_korisnicko_ime: string;
  poruka_lozinka: string;
  poruka_potvrda_lozinke: string;
  poruka_prazno_polje: string;
  poruka_email: string;
  poruka_telefon: string;
  poruka_profilna_slika: string;
  poruka_uspesno_registrovan: string;


  proveraLozinke(): boolean {
    const lozinkaRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])(?!.*(.)(\1))(?=.*[a-z])(?=.*[A-Z]).{8,14}$/
    if (!lozinkaRegex.test(this.lozinka)) {
      this.poruka_lozinka = "Format lozinke nije validan.";
      return false;
    }
    if (this.lozinka != this.potvrda_lozinke) {
      this.poruka_potvrda_lozinke = "Lozinka za potvrdu nije ista kao lozinka koju ste uneli."
      return false;
    }

    this.poruka_lozinka = null;
    this.poruka_potvrda_lozinke = null;
    return true;
  }

  pocetnoStanje() {
    this.poruka_email = null;
    this.poruka_korisnicko_ime = null;
    this.poruka_lozinka = null;
    this.poruka_prazno_polje = null;
    this.poruka_telefon = null;
    this.poruka_potvrda_lozinke = null;
    this.poruka_profilna_slika = null;
    this.poruka_uspesno_registrovan = null;
  }

  url: any;
  odabraniFile: File;

  onFileSelected(event) {
    this.odabraniFile = <File>event.target.files[0];
    if (this.odabraniFile) {
      var reader = new FileReader();
      reader.readAsDataURL(this.odabraniFile)
      reader.onload = (e: any) => {
        var image = new Image();
        image.src = <string>e.target.result;
        this.url = image.src;
      }
    }
  }

  dodajLekara() {
    this.pocetnoStanje();
    if (this.korisnicko_ime != null) {
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
          if (!this.proveraLozinke()) return;
          if (!this.ime || !this.prezime || !this.adresa || !this.email) {
            this.poruka_prazno_polje = "Sva polja za dodavanje novog lekara su obavezna. Molim Vas popunite sva polja."
            return;
          }

          this.ime = this.ime.charAt(0).toUpperCase() + this.ime.slice(1)
          this.prezime = this.prezime.charAt(0).toUpperCase() + this.prezime.slice(1)
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
              if (!this.telefon) {
                this.poruka_prazno_polje = "Sva polja za dodavanje novog lekara su obavezna. Molim Vas popunite sva polja."
                return;
              }
              const telefonRegex = /^\+381-\d{2}-\d{3}-\d{4}$/;
              if (!telefonRegex.test(this.telefon)) {
                this.poruka_telefon = "Pogresan format za kontak telefon."
                return;
              }

              if (!this.lekarska_licenca || !this.izabrana_specijalizacija || !this.ogranak_ordinacije) {
                this.poruka_prazno_polje = "Sva polja za dodavanje novog lekara su obavezna. Molim Vas popunite sva polja."
                return;
              }
              this.ogranak_ordinacije.toLocaleLowerCase();
              var flag_slika = true;
              if (this.odabraniFile) {
                var reader = new FileReader();
                reader.readAsDataURL(this.odabraniFile)
                reader.onload = (e: any) => {
                  var image = new Image();
                  image.src = <string>e.target.result;
                  this.url = image.src;
                  image.onload = () => {
                    var height = image.height;
                    var width = image.width;
                    if (height < 100 || width < 100 || height > 500 || width > 500) {
                      this.poruka_profilna_slika = "Slika ne sme biti kraca od 100px i veca od 300px";
                      flag_slika = false;
                      return;
                    } else {
                      const data1 = {
                        korisnicko_ime: this.korisnicko_ime,
                        lozinka: this.lozinka,
                        ime: this.ime,
                        prezime: this.prezime,
                        adresa: this.adresa,
                        kontakt_telefon: this.telefon,
                        email: this.email,
                        licenca: this.lekarska_licenca,
                        specijalizacija: this.izabrana_specijalizacija,
                        ogranak: this.ogranak_ordinacije,
                        profilna_slika: this.url
                      }
                      console.log(data1);
                      this.menadzerService.dodajNovogLekara(data1).subscribe(resp => {
                        if (resp['message'] == "ok") {
                          this.korisnicko_ime = null;
                          this.lozinka = null;
                          this.potvrda_lozinke = null;
                          this.ime = null;
                          this.prezime = null;
                          this.adresa = null;
                          this.telefon = null;
                          this.email = null;
                          this.lekarska_licenca = null;
                          this.izabrana_specijalizacija = null;
                          this.ogranak_ordinacije = null;
                          this.url = null
                          this.poruka_uspesno_registrovan = "Uspesno ste dodali lekara !";
                        }
                      })
                    }
                  }
                }
              } else {
                this.url = null;
                const data1 = {
                  korisnicko_ime: this.korisnicko_ime,
                  lozinka: this.lozinka,
                  ime: this.ime,
                  prezime: this.prezime,
                  adresa: this.adresa,
                  kontakt_telefon: this.telefon,
                  email: this.email,
                  licenca: this.lekarska_licenca,
                  specijalizacija: this.izabrana_specijalizacija,
                  ogranak: this.ogranak_ordinacije,
                  profilna_slika: this.url
                }
                this.menadzerService.dodajNovogLekara(data1).subscribe(resp => {
                  if (resp['message'] == "ok") {
                    this.korisnicko_ime = null;
                          this.lozinka = null;
                          this.potvrda_lozinke = null;
                          this.ime = null;
                          this.prezime = null;
                          this.adresa = null;
                          this.telefon = null;
                          this.email = null;
                          this.lekarska_licenca = null;
                          this.izabrana_specijalizacija = null;
                          this.ogranak_ordinacije = null;
                          this.url = null
                    this.poruka_uspesno_registrovan = "Uspesno ste dodali lekara !";
                  }
                })
              }

              if (!flag_slika) return;

            }
          })
        }
      })
    } else {
      this.poruka_korisnicko_ime = "Niste uneli sva polja!";
      return;
    }

  }
}
