import mongoose from "mongoose";

const Schema = mongoose.Schema;

let PredlogPregled = new Schema({
    naziv:{
        type : String
    },
    cena:{
        type : String
    },
    trajanje:{
        type : String
    },
    specijalizacija:{
        type : String
    },
    predlozen_od_strane :{
        type : String
    },
    datum : {
        type : Date
    }
})

export default mongoose.model('PredlogPregledModel', PredlogPregled,'predlog_pregleda')