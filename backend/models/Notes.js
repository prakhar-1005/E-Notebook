const mongoose = require('mongoose');
// const { Schema } = mongoose;

const NoteSchema = new mongoose.Schema({ //When -> const { Schema } = mongoose; is used then we don't need "mongoose." , Just Schema is enough  

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'                           // ref:'User comes from the Users model from exports
    },

    title: {
        type:String,
        required:true
    },

    description: {
        type:String,
        required:true
    },

    tag: {
        type:String,
        default:'General'
    },

    date: {
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model('Note' , NoteSchema);