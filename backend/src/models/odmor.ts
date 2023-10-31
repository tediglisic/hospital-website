import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Odmor = new Schema({
    korisnicko_ime : {
        type : String
    },
    
    odmor_od :{
        type : Date
    },

    odmor_do : {
        type : Date
    }
    
})

export default mongoose.model('OdmorModel', Odmor,'odmor')