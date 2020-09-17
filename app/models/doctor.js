const mongoose = require('mongoose')

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
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Doctor', doctorSchema)
