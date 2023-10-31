import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Obavestenja = new Schema({
    id : {
        type : Number
    },
    tip :{
        type : String
    },

    text : {
        type : String
    },

    datum : {
        type : Date
    },
    datum_string:{
        type : String
    },
    korisnici :{
        type : Array
    } 
    
})

export default mongoose.model('ObavestenjaModel', Obavestenja,'obavestenja')