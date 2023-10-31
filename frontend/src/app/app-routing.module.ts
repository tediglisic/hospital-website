import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LekarPocetnaComponent } from './lekar-pocetna/lekar-pocetna.component';
import { LekarOdmorComponent } from './lekar-odmor/lekar-odmor.component';
import { LekarPromenaLozinkeComponent } from './lekar-promena-lozinke/lekar-promena-lozinke.component';
import { PacijentPromenaLozinkeComponent } from './pacijent-promena-lozinke/pacijent-promena-lozinke.component';
import { LekarAzurirajComponent } from './lekar-azuriraj/lekar-azuriraj.component';
import { MenadzerAzurirajLekarComponent } from './menadzer-azuriraj-lekar/menadzer-azuriraj-lekar.component';
import { MenadzerAzurirajPacijentComponent } from './menadzer-azuriraj-pacijent/menadzer-azuriraj-pacijent.component';
import { MenadzerOdobriPacijentaComponent } from './menadzer-odobri-pacijenta/menadzer-odobri-pacijenta.component';
import { MenadzerPregledLekaraComponent } from './menadzer-pregled-lekara/menadzer-pregled-lekara.component';
import { MenadzerAzurirajPregledeComponent } from './menadzer-azuriraj-preglede/menadzer-azuriraj-preglede.component';
import { MenadzerLekarPredloziComponent } from './menadzer-lekar-predlozi/menadzer-lekar-predlozi.component';
import { MenadzerObavestenjeComponent } from './menadzer-obavestenje/menadzer-obavestenje.component';
import { MenadzerPreglediComponent } from './menadzer-pregledi/menadzer-pregledi.component';
import { MenadzerDodajSpecijalizacijuComponent } from './menadzer-dodaj-specijalizaciju/menadzer-dodaj-specijalizaciju.component';
import { PacijentObavestenjaComponent } from './pacijent-obavestenja/pacijent-obavestenja.component';
import { PacijentTerminiIzvestajiComponent } from './pacijent-termini-izvestaji/pacijent-termini-izvestaji.component';
import { LekarIzvestajComponent } from './lekar-izvestaj/lekar-izvestaj.component';
import { LekarPacijentKartonComponent } from './lekar-pacijent-karton/lekar-pacijent-karton.component';
import { NeregistrovanPocetnaComponent } from './neregistrovan-pocetna/neregistrovan-pocetna.component';
import { NeregistrovanLekariComponent } from './neregistrovan-lekari/neregistrovan-lekari.component';
import { NeregistrovanLoginComponent } from './neregistrovan-login/neregistrovan-login.component';
import { NeregistrovanRegistracijaComponent } from './neregistrovan-registracija/neregistrovan-registracija.component';
import { PacijentPocetnaComponent } from './pacijent-pocetna/pacijent-pocetna.component';
import { PacijentPregledLekaraComponent } from './pacijent-pregled-lekara/pacijent-pregled-lekara.component';
import { PacijentLekarProfilComponent } from './pacijent-lekar-profil/pacijent-lekar-profil.component';
import { PacijentAzurirajComponent } from './pacijent-azuriraj/pacijent-azuriraj.component';
import { PacijentZakazivanjeFormaComponent } from './pacijent-zakazivanje-forma/pacijent-zakazivanje-forma.component';
import { PacijentZakazivanjeKalendarComponent } from './pacijent-zakazivanje-kalendar/pacijent-zakazivanje-kalendar.component';
import { MenadzerLoginComponent } from './menadzer-login/menadzer-login.component';
import { MenadzerPocetnaComponent } from './menadzer-pocetna/menadzer-pocetna.component';
import { MenadzerPregledPacijenataComponent } from './menadzer-pregled-pacijenata/menadzer-pregled-pacijenata.component';
import { MenadzerDodajLekaraComponent } from './menadzer-dodaj-lekara/menadzer-dodaj-lekara.component';
import { MenadzerDodajPregledComponent } from './menadzer-dodaj-pregled/menadzer-dodaj-pregled.component';
import { MenadzerPromenaLozinkeComponent } from './menadzer-promena-lozinke/menadzer-promena-lozinke.component';
import { LekarPreglediComponent } from './lekar-pregledi/lekar-pregledi.component';


const routes: Routes = [

  //Path - za neregistrovanog korisnika
  {path:'', component:NeregistrovanPocetnaComponent},
  {path:'nereg/pregled_lekara', component:NeregistrovanLekariComponent},
  {path:'nereg/login', component:NeregistrovanLoginComponent},
  {path:'nereg/registracija', component:NeregistrovanRegistracijaComponent},

  //Path - za pacijenta
  {path:'pacijent/pocetna', component:PacijentPocetnaComponent},
  {path:'pacijent/lekari', component:PacijentPregledLekaraComponent},
  {path:'pacijent/lekari/lekar_profil', component:PacijentLekarProfilComponent},
  {path:'pacijent/pocetna/azuriranje_profila', component:PacijentAzurirajComponent},
  {path:'pacijent/pocetna/promena_lozinke', component:PacijentPromenaLozinkeComponent},
  {path:'pacijent/obavestenja', component:PacijentObavestenjaComponent},
  {path:'pacijent/lekari/zakazi_pregled_forma', component:PacijentZakazivanjeFormaComponent},
  {path:'pacijent/lekari/zakazi_pregled_kalendar', component:PacijentZakazivanjeKalendarComponent},
  {path:'pacijent/termini_izvestaji', component:PacijentTerminiIzvestajiComponent},

  //Path - za lekara
  {path:'lekar/pocetna', component:LekarPocetnaComponent},
  {path:'lekar/pocetna/azuriranje_profila', component:LekarAzurirajComponent},
  {path:'lekar/pocetna/promena_lozinke', component:LekarPromenaLozinkeComponent},
  {path:'lekar/pacijent/karton', component:LekarPacijentKartonComponent},
  {path:'lekar/pacijent/karton/nov_izvestaj', component:LekarIzvestajComponent},
  {path:'lekar/razno', component:LekarOdmorComponent},
  {path:'lekar/pregledi', component:LekarPreglediComponent},
 
  //Path - za menadzera
  {path:'menadzer/login', component:MenadzerLoginComponent},
  {path:'menadzer/pocetna', component:MenadzerPocetnaComponent},
  {path:'menadzer/lekari', component:MenadzerPregledLekaraComponent},
  {path:'menadzer/lekari/azuriranje_profila', component:MenadzerAzurirajLekarComponent},
  {path:'menadzer/pacijenti', component:MenadzerPregledPacijenataComponent},
  {path:'menadzer/pacijenti/azuriranje_profila', component:MenadzerAzurirajPacijentComponent},
  {path:'menadzer/pregledi', component:MenadzerPreglediComponent},
  {path:'menadzer/pregledi/azuriranje_pregleda', component:MenadzerAzurirajPregledeComponent},
  {path:'menadzer/nov_lekar', component:MenadzerDodajLekaraComponent},
  {path:'menadzer/nova_specijalizacija', component:MenadzerDodajSpecijalizacijuComponent},
  {path:'menadzer/novi_reg_korisnici', component:MenadzerOdobriPacijentaComponent},
  {path:'menadzer/obavestenje', component:MenadzerObavestenjeComponent},
  {path:'menadzer/lekar_predlozi', component:MenadzerLekarPredloziComponent},
  {path:'menadzer/nov_pregled', component:MenadzerDodajPregledComponent},
  {path:'menadzer/promena_lozinke',component:MenadzerPromenaLozinkeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
