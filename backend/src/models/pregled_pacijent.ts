import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import PregledModel from "./pregled";

const Schema = mongoose.Schema;

let PregledPacijent = new Schema({

    lekar:{
        type : String
    },
    lekar_kor : {
        type : String
    },
    pacijent : {
        type : String
    },
    datum:{
        type : Date
    },
    datum_string:{
        type : String
    },
    vremeOd:{
        type : Date
    },
    vremeOd_string:{
        type : String
    },
    vremeDo:{
        type : Date
    },
    vremeDo_string:{
        type:String
    },
    pregled : {
        type : Object
    },
    ogranak : {
        type : String
    },
    specijalizacija : {
        type : String
    },
    obavestenje : {
        type:Number
    },
    izvestaj : {
        type : Object
    }

})

export default mongoose.model('PregledPacijentModel', PregledPacijent,'pregled_pacijent')