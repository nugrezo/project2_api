// requiring mangoose library
const mongoose = require('mongoose')

// creating the doctorsSchema
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true
})

// Exporting the doctorSchema to use in other folder.
module.exports = mongoose.model('Doctor', doctorSchema)
