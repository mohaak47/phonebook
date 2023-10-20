const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let persons = [
  {
    name: 'moha amani',
    number: '09113525123'
  },
  ]

app.get('/',(request,response) => {
  response.send('<h1> Mohammad Amani </h1>')
})

app.get('/info',(request,response) => {
  const numberOfPersons = persons.length
  const date = new Date()
  response.send(`<h3>phonebook has info for ${numberOfPersons} persons </h3>`+
      `<p> ${date} </p>`)
})

app.get('/api/persons',(request,response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.number || !body.name) {
    return response.status(400).json({
      error: " name or number missing"
    })
  }

  if (persons.find( (person) => person.name === body.name )) {
       return response.status(400).json({
       error: "name must be unique"
     })
   }

  const person = new Person({
    name: body.name,
    number: body.number,
   })

  person.save()
        .then(savedPerson => {
          response.json(savedPerson)
        })
        .catch((error) => {
          console.log('Error:',error.message)
        })
})
const PORT = process.env.PORT
app.listen(PORT, () =>{
  console.log(`Server running on PORT:${PORT}`)
})
