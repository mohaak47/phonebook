const mongoose = require('mongoose')

//mongoose.set('strictQuary', false)
const url = process.env.MONGODB_URI

console.log('connecting to',url)

mongoose.connect(url)
        .then((result) => {
           console.log('connected to MongoDB')
         })
        .catch((error) => {
           console.log('error connecting to Mongodb', error.message)
         })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  }
  number: {
    type: String,
    minLength: 11,
    maxLength:11,
  }
})

  personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)
