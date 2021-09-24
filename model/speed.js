const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const speedSchema = new Schema({
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
        },
        totaldownload: {
            type : Number,
            required : true
        },
        totalupload: {
            type : Number,
            required : true
        },
        total: {
            type : Number,
            required : true
        }
}, { timestamps : true });

const Speed = mongoose.model( 'Speed', speedSchema );
module.exports = Speed;


