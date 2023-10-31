import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Pacijent = new Schema({
    korisnicko_ime:{
        type : String
    },
    lozinka:{
        type : String
    },
    ime:{
        type : String
    },
    prezime:{
        type : String
    },
    adresa:{
        type : String
    },
    kontakt_telefon:{
        type : String
    },
    email:{
        type : String
    },
    profilna_slika : {
        type : String
    },
    odobren_zahtev_registracije : {
        type : String
    }
})

export default mongoose.model('PacijentModel', Pacijent,'pacijent')