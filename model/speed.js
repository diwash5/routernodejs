const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const speedSchema = new Schema({
        date: {
            type : String,
            required : true
        },
        data: {
            type : Array,
            required : true
        }
});

const Speed = mongoose.model( 'Speed', speedSchema );
module.exports = Speed;
