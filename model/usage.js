const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usageSchema = new Schema({
        user: {
            type : String,
            required : true
        },
        macaddress: {
            type : String,
            required : true
        },
        download: {
            type : Number,
            required : true
        },
        upload: {
            type : Number,
            required : true
        }
}, { timestamps : true });

const Usage = mongoose.model( 'Usage', usageSchema );
module.exports = Usage;