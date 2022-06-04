const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({

    firstname: String,
    lastname: String,
    email: String,
    address: String

})

module.exports = mongoose.model('student', studentSchema)