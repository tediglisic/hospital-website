import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LekarService {

  constructor(private http : HttpClient) { }

  uri = 'http://localhost:4000';
  
  dohvati_preglede(data){
    return this.http.post(`${this.uri}/lekar/pocetna/dohvati_preglede`,data);
  }

  izaberi_preglede(data){
    return this.http.post(`${this.uri}/lekar/pocetna/izaberi_preglede`,data);
  }

  proveriPredlog(data){
    return this.http.post(`${this.uri}/lekar/pocetna/proveri_predlog`,data);
  }

  posaljiPredlog(data){
    return this.http.post(`${this.uri}/lekar/pocetna/posalji_predlog`,data);
  }

  azuriraj_profil(data){
    return this.http.post(`${this.uri}/lekar/pocetna/azuriraj_profil`,data);
  }

  promeni_lozinku(data){
    return this.http.post(`${this.uri}/lekar/pocetna/promeni_lozinku`,data);
  }

  azuriraj_sliku(data){
    return this.http.post(`${this.uri}/lekar/pocetna/azuriraj_sliku`,data);
  }

  odmor(data){
    return this.http.post(`${this.uri}/lekar/pocetna/zakazi_odmor`,data);
  }
  dohvati_pacijent_preglede(data){
    return this.http.post(`${this.uri}/lekar/pocetna/pacijent_pregledi`,data);
  }
  otkazi_termin(data){
    return this.http.post(`${this.uri}/lekar/pocetna/otkazi_termin`,data);
  }

  unesi_izvestaj(data){
    return this.http.post(`${this.uri}/lekar/pocetna/unesi_izvestaj`,data);
  }

  dohvatiLekara(data){
    return this.http.post(`${this.uri}/lekar/pocetna/dohvati_lekara`,data);
  }
  
  dohvatiOdmore(data){
    return this.http.post(`${this.uri}/lekar/pocetna/dohvati_odmore`,data);
  }

  dohvati_sve_preglede(){
    return this.http.get(`${this.uri}/lekar/pocetna/dohvati_sve_preglede`);
  }

  azuriraj_svoje_preglede(data){
    return this.http.post(`${this.uri}/lekar/pocetna/azuriraj_svoje_preglede`,data);
  }
}
