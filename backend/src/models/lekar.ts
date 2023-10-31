import { FILE } from "dns";
import { Int32 } from "mongodb";
import mongoose from "mongoose";
import { Interface } from "readline";
import Pregled from "../models/pregled"

const Schema = mongoose.Schema;

let Lekar = new Schema({
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
    lekarska_licenca:{
        type : String
    },
    specijalizacija:{
        type : String
    },
    ogranak_ordinacije:{
        type : String
    },
    profilna_slika : {
        type : String
    },
    pregledi : {
        type : Array
    }
})

export default mongoose.model('LekarModel', Lekar,'lekar')