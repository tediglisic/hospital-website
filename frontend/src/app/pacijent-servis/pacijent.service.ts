import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacijentService {

  constructor(private http : HttpClient) { }

  
  uri = 'http://localhost:4000'

  promeni_lozinku(data){
    return this.http.post(`${this.uri}/pacijent/promeni_lozinku`,data);
  }

  azurirajSliku(data){
    console.log("ovde")
    return this.http.post(`${this.uri}/pacijent/azuriraj_sliku`,data);
  }

  azurirajProfil(data){
    return this.http.post(`${this.uri}/pacijent/azuriraj_profil`,data);
  }

  otkaziTermin(data){
    return this.http.post(`${this.uri}/pacijent/otkazi_termin`,data);
  }

  dohvatiPreglede(data){
    return this.http.post(`${this.uri}/pacijent/dohvati_preglede`,data);
  }

  sendEmail(data) {
    return this.http.post(`${this.uri}/pacijent/send_email`, data);
  }

  zakaziPregled(data) {
    return this.http.post(`${this.uri}/pacijent/zakazi_pregled`, data);
  }

  dohvatiObavestenja(data){
    return this.http.post(`${this.uri}/pacijent/dohvati_obavestenja`, data);
  
  }
  procitajObavestenje(data){
    return this.http.post(`${this.uri}/pacijent/procitao_obavestenje`, data);
  
  }

  dodajPDF(data){
    return this.http.post(`${this.uri}/pacijent/dodaj_pdf`, data);
  
  }

}
