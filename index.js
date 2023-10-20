const express = require('express')
const cors = require('cors')
const Person = requir('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let people = [
  ]

app.get('/',(request,response) => {
  response.send('<h1> Mohammad Amani </h1>')
})

app.get('/info',(request,response) => {
  const numberOfPersons = people.length
  const date = new Date()
  response.send(`<h3>phonebook has info for ${numberOfPersons} persons </h3>`+
      `<p> ${date} </p>`)
})

app.get('/api/people',(request,response) => {
  response.json(people)
})

app.get('/api/people/:id', (request, response) => {
  const id = Number (request.params.id)
  const person = people.find( (person) => person.id === id )
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/people/:id',(request, response) => {
  const id = Number(request.params.id)
  people = people.filter( (person) => person.id !== id )
  response.status(204).end()
})

app.post('/api/people', (request, response) => {
  const body = request.body

  if (!body.number || !body.name) {
    return response.status(400).json({
      error: " name or number missing"
    })
  }
  if (people.find( (person) => person.name === body.name )) {
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

const PORT = 3001
app.listen(PORT, () =>{
  console.log(`Server running on PORT${PORT}`)
})
