import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lekar } from '../model/lekar';

@Injectable({
  providedIn: 'root'
})
export class GeneralniService {

  constructor(private http : HttpClient) { }

  uri = 'http://localhost:4000'

  proveriKorisnickoIme(data){
    return this.http.post(`${this.uri}/nereg/proveri_korisnicko_ime`,data);
  }

  proveriEmail(uneti_email){
    const data = {
      email : uneti_email
    }
    return this.http.post(`${this.uri}/nereg/proveri_email`,data);
  }

  dohvatiLekare() {
    return this.http.get(`${this.uri}/nereg/dohvati_lekare`);
  }

  registruj(nov_pacijent_data){
    return this.http.post(`${this.uri}/nereg/registruj`, nov_pacijent_data);
  }

  login(data){
    return this.http.post(`${this.uri}/nereg/login`, data);
  }

  
}
