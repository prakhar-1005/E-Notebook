const mongoose = require('mongoose');

const connectToMongo=()=>{
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
}

module.exports = connectToMongo;