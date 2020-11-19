const mongoose =require('mongoose')
let userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fname:String,
    lname:String,
    age:Number,
    mobile:Number,
    skills:Array,
})

module.exports = mongoose.model('contacts',userSchema);
