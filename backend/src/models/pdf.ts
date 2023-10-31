import mongoose from "mongoose";

const Schema = mongoose.Schema;

let PDF = new Schema({
   id : {
    type : Number
   },
   izvestaji : {
    type : Array
   }
    
})

export default mongoose.model('PDFModel', PDF,'pdf')