const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  'mongodb+srv://mohaak:' + password + '@cluster0.juukqdd.mongodb.net/phonebookApp?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

/* const personList = [
  {
    name: "Ali Alavi",
    number: "09121234567"
  },
  {
    name: "Amir behnood",
    number: "09121234568"
  }
]
*/

/* const persons = personList.map(person => {
  const dbPerson = new Person(person)
  dbPerson.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
  })

})
*/
