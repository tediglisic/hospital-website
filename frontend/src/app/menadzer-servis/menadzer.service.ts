import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenadzerService {

  constructor(private http : HttpClient) { }

  uri = 'http://localhost:4000'

  dodaj_specijalizaciju(naziv_specijalizacije){
    const data = {
      nova_specijalizacija : naziv_specijalizacije
    }
    return this.http.post(`${this.uri}/menadzer/nova_specijalizacija/dodaj`,data);
  }

  dohvatiSpecijalizacije(){
    return this.http.get(`${this.uri}/menadzer/dohvati_sve_specijalizacije`);
  }

  proveriKorisnickoIme(data){
    return this.http.post(`${this.uri}/menadzer/proveri_korisnicko_ime`,data);
  }

  proveriEmail(uneti_email){
    const data = {
      email : uneti_email
    }
    return this.http.post(`${this.uri}/menadzer/proveri_email`,data);
  }

  dodajNovogLekara(nov_lekar_data){
    return this.http.post(`${this.uri}/menadzer/dodaj_lekara`, nov_lekar_data);
  }

  dohvatiPacijente(){
    return this.http.get(`${this.uri}/menadzer/dohvati_pacijente`);
  }
  dohvatiPacijenteP(){
    return this.http.get(`${this.uri}/menadzer/dohvati_pacijente_p`);
  }

  prihvatiRegistraciju(pkorisnicko_ime){
    const data = {
      korisnicko_ime : pkorisnicko_ime
    }
    return this.http.post(`${this.uri}/menadzer/prihvati_registraciju`,data);
  }

  odbijRegistraciju(pkorisnicko_ime){
    const data = {
      korisnicko_ime : pkorisnicko_ime
    }
    return this.http.post(`${this.uri}/menadzer/odbi_registraciju`,data);
  }

  dohvatiNovePredloge(){
    return this.http.get(`${this.uri}/menadzer/dohvati_nove_predloge`);
  }

  prihvatiNovPredlog(data){
    return this.http.post(`${this.uri}/menadzer/prihvati_nov_predlog`,data);
  }

  odbiNovPredlog(data){
    return this.http.post(`${this.uri}/menadzer/odbi_nov_predlog`,data);
  }

  proveriPregled(data){
    return this.http.post(`${this.uri}/menadzer/proveri_pregled`,data);
  }

  dodajPregled(data){
    return this.http.post(`${this.uri}/menadzer/dodaj_pregled`,data);
  }

  dohvatiPreglede(){
    return this.http.get(`${this.uri}/menadzer/dohvati_preglede`);
  }

  obrisiPregled(data){
    return this.http.post(`${this.uri}/menadzer/obrisi_pregled`,data);
  }

  azurirajPregled(data){
    return this.http.post(`${this.uri}/menadzer/azuriraj_pregled`,data);
  }

  promeni_lozinku(data){
    return this.http.post(`${this.uri}/menadzer/promeni_lozinku`,data);
  }

  obrisi_pacijenta(data){
    return this.http.post(`${this.uri}/menadzer/obrisi_pacijenta`,data);
  }
  obrisi_lekara(data){
    return this.http.post(`${this.uri}/menadzer/obrisi_lekara`,data);
  }

  azuriraj_pacijenta(data){
    return this.http.post(`${this.uri}/menadzer/azuriraj_pacijenta`,data);
  }

  dodaj_obavestenje(data){
    return this.http.post(`${this.uri}/menadzer/dodaj_obavestenje`,data);
  }

  promena_cene_obavestenje(data){
    return this.http.post(`${this.uri}/menadzer/promena_cene_obavestenje`,data);
  }

  azuriraj_lekar_profil(data){
    return this.http.post(`${this.uri}/menadzer/azuriraj_lekar_profil`,data);
  }

  azuriraj_pacijent_profil(data){
    return this.http.post(`${this.uri}/menadzer/azuriraj_pacijent_profil`,data);
  }

  dohvati_lekara(data){
    return this.http.post(`${this.uri}/menadzer/dohvati_lekar`,data);
  }

  
}
