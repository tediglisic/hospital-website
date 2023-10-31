import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NeregistrovanPocetnaComponent } from './neregistrovan-pocetna/neregistrovan-pocetna.component';
import { NeregistrovanLekariComponent } from './neregistrovan-lekari/neregistrovan-lekari.component';
import { NeregistrovanRegistracijaComponent } from './neregistrovan-registracija/neregistrovan-registracija.component';
import { NeregistrovanLoginComponent } from './neregistrovan-login/neregistrovan-login.component';
import { MenadzerLoginComponent } from './menadzer-login/menadzer-login.component';
import { MenadzerPocetnaComponent } from './menadzer-pocetna/menadzer-pocetna.component';
import { MenadzerDodajLekaraComponent } from './menadzer-dodaj-lekara/menadzer-dodaj-lekara.component';
import { PacijentPocetnaComponent } from './pacijent-pocetna/pacijent-pocetna.component';
import { LekarPocetnaComponent } from './lekar-pocetna/lekar-pocetna.component';
import { MenadzerOdobriPacijentaComponent } from './menadzer-odobri-pacijenta/menadzer-odobri-pacijenta.component';
import { MenadzerObavestenjeComponent } from './menadzer-obavestenje/menadzer-obavestenje.component';
import { MenadzerLekarPredloziComponent } from './menadzer-lekar-predlozi/menadzer-lekar-predlozi.component';
import { MenadzerPregledPacijenataComponent } from './menadzer-pregled-pacijenata/menadzer-pregled-pacijenata.component';
import { MenadzerPregledLekaraComponent } from './menadzer-pregled-lekara/menadzer-pregled-lekara.component';
import { MenadzerAzurirajPacijentComponent } from './menadzer-azuriraj-pacijent/menadzer-azuriraj-pacijent.component';
import { MenadzerAzurirajLekarComponent } from './menadzer-azuriraj-lekar/menadzer-azuriraj-lekar.component';
import { LekarOdmorComponent } from './lekar-odmor/lekar-odmor.component';
import { PacijentPromenaLozinkeComponent } from './pacijent-promena-lozinke/pacijent-promena-lozinke.component';
import { LekarPromenaLozinkeComponent } from './lekar-promena-lozinke/lekar-promena-lozinke.component';
import { PacijentPregledLekaraComponent } from './pacijent-pregled-lekara/pacijent-pregled-lekara.component';
import { PacijentZakazivanjeFormaComponent } from './pacijent-zakazivanje-forma/pacijent-zakazivanje-forma.component';
import { PacijentZakazivanjeKalendarComponent } from './pacijent-zakazivanje-kalendar/pacijent-zakazivanje-kalendar.component';
import { PacijentTerminiIzvestajiComponent } from './pacijent-termini-izvestaji/pacijent-termini-izvestaji.component';
import { PacijentObavestenjaComponent } from './pacijent-obavestenja/pacijent-obavestenja.component';
import { MenadzerPreglediComponent } from './menadzer-pregledi/menadzer-pregledi.component';
import { MenadzerAzurirajPregledeComponent } from './menadzer-azuriraj-preglede/menadzer-azuriraj-preglede.component';
import { PacijentAzurirajComponent } from './pacijent-azuriraj/pacijent-azuriraj.component';
import { PacijentLekarProfilComponent } from './pacijent-lekar-profil/pacijent-lekar-profil.component';
import { LekarAzurirajComponent } from './lekar-azuriraj/lekar-azuriraj.component';
import { MenadzerDodajSpecijalizacijuComponent } from './menadzer-dodaj-specijalizaciju/menadzer-dodaj-specijalizaciju.component';
import { LekarIzvestajComponent } from './lekar-izvestaj/lekar-izvestaj.component';
import { LekarPacijentKartonComponent } from './lekar-pacijent-karton/lekar-pacijent-karton.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenadzerDodajPregledComponent } from './menadzer-dodaj-pregled/menadzer-dodaj-pregled.component';
import { MenadzerPromenaLozinkeComponent } from './menadzer-promena-lozinke/menadzer-promena-lozinke.component';
import { LekarPreglediComponent } from './lekar-pregledi/lekar-pregledi.component'

@NgModule({
  declarations: [
    AppComponent,
    NeregistrovanPocetnaComponent,
    NeregistrovanLekariComponent,
    NeregistrovanRegistracijaComponent,
    NeregistrovanLoginComponent,
    MenadzerLoginComponent,
    MenadzerPocetnaComponent,
    MenadzerDodajLekaraComponent,
    PacijentPocetnaComponent,
    LekarPocetnaComponent,
    MenadzerOdobriPacijentaComponent,
    MenadzerObavestenjeComponent,
    MenadzerLekarPredloziComponent,
    MenadzerPregledPacijenataComponent,
    MenadzerPregledLekaraComponent,
    MenadzerAzurirajPacijentComponent,
    MenadzerAzurirajLekarComponent,
    LekarOdmorComponent,
    PacijentPromenaLozinkeComponent,
    LekarPromenaLozinkeComponent,
    PacijentPregledLekaraComponent,
    PacijentZakazivanjeFormaComponent,
    PacijentZakazivanjeKalendarComponent,
    PacijentTerminiIzvestajiComponent,
    PacijentObavestenjaComponent,
    MenadzerPreglediComponent,
    MenadzerAzurirajPregledeComponent,
    PacijentAzurirajComponent,
    PacijentLekarProfilComponent,
    LekarAzurirajComponent,
    MenadzerDodajSpecijalizacijuComponent,
    LekarIzvestajComponent,
    LekarPacijentKartonComponent,
    MenadzerDodajPregledComponent,
    MenadzerPromenaLozinkeComponent,
    LekarPreglediComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
