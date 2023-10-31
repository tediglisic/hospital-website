import { Component, OnInit } from '@angular/core';
import { GeneralniService } from '../generalni-servis/generalni.service';

@Component({
  selector: 'app-neregistrovan-registracija',
  templateUrl: './neregistrovan-registracija.component.html',
  styleUrls: ['./neregistrovan-registracija.component.css']
})
export class NeregistrovanRegistracijaComponent implements OnInit {

  constructor(private generalService: GeneralniService) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.pocetnoStanje();
  }

  korisnicko_ime: string;
  lozinka: string;
  potvrda_lozinke: string;
  ime: string;
  prezime: string;
  adresa: string;
  telefon: string;
  email: string;

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
      this.poruka_lozinka = "Lozinka koju ste izabrali nije validnog formata.";
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

  izabranaSlika(event) {
    this.odabraniFile = <File>event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.odabraniFile)
    reader.onload = (e: any) => {
          var image = new Image();
          image.src = <string>e.target.result;
          this.url = image.src;
    }
  }

  registracija() {
    this.pocetnoStanje();
    if (this.korisnicko_ime != null) {
      const data = {
        korisnicko_ime: this.korisnicko_ime
      }
      this.generalService.proveriKorisnickoIme(data).subscribe((respObject) => {
        if (respObject['message'] == 'postoji') {
          this.poruka_korisnicko_ime = "Korisnicko ime postoji. Unesite drugo.";
          return;
        } else if (respObject['message'] == 'odbijeno') {
          this.poruka_korisnicko_ime = "Korisnicko ime je odbijeno. Unesite drugo.";
          return;
        } else {
          if (!this.proveraLozinke()) return;
          if (!this.ime || !this.prezime || !this.adresa || !this.email) {
            this.poruka_prazno_polje = "Sva polja za registraciju su obavezna. Molim Vas popunite sva polja."
            return;
          }
          this.ime = this.ime.charAt(0).toUpperCase() + this.ime.slice(1)
          this.prezime = this.prezime.charAt(0).toUpperCase() + this.prezime.slice(1)
          const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(this.email)) {
            this.poruka_email = "Pogresan format za mejl."
            return;
          }
          this.generalService.proveriEmail(this.email).subscribe((respObject) => {
            if (respObject['message'] != 'ok') {
              this.poruka_email = "Email postoji ili je odbijen. Unesite drugi email.";
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
              var flag_slika = true;
              if (this.odabraniFile) {
                var reader = new FileReader();
                reader.readAsDataURL(this.odabraniFile)
                reader.onload = (e: any) => {
                  var image = new Image();
                  image.src = <string>e.target.result;
                  this.url = image.src;
                  image.onload = () => {
                    if (image.height < 100 || image.width < 100 || image.height > 300 || image.width > 300) {
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
                        profilna_slika: this.url
                      }
                      this.generalService.registruj(data1).subscribe(resp => {
                        if (resp['message'] == "ok") {
                          this.korisnicko_ime = null;
                          this.lozinka = null;
                          this.ime = null;
                          this.potvrda_lozinke = null;
                          this.prezime = null;
                          this.adresa = null;
                          this.telefon = null;
                          this.email = null;
                          this.url = null;
                          this.poruka_uspesno_registrovan = "Uspesno ste registrovani !";
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
                  profilna_slika: this.url
                }
                this.generalService.registruj(data1).subscribe(resp => {
                  if (resp['message'] == "ok") {
                    this.korisnicko_ime = null;
                    this.lozinka = null;
                    this.ime = null;
                    this.potvrda_lozinke = null;
                    this.prezime = null;
                    this.adresa = null;
                    this.telefon = null;
                    this.email = null;
                    this.url = null;
                    this.poruka_uspesno_registrovan = "Uspesno ste registrovani !";
                  }
                })
              }


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
