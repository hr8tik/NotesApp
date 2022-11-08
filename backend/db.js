const mongoose = require("mongoose")
const mongoURI = "mongodb://localhost:27017/notebook"
const connectToMongo = ()=>{
mongoose.connect(mongoURI,()=>{
console.log("Mongo connected")
})
}

module.exports = connectToMongo;