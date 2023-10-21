const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())


let persons = [
  ]

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

  app.get('/api/persons/:id',(request,response) => {
    Person.findById(request.params.id)
     .then(person => {
       if (person) {
         response.json(person)
       }
       else {
         response.status(404).end()
       }
     })
     .catch(error => {
       console.log(error)
       response.status(400).send({error: 'malformatted id'})
     })
  })

  app.delete('/api/persons/:id',(request,response) => {
    console.log('delete request received')
    const id = Number(request.body)
     Person.findByIdAndRemove(id)
           .then(result => {
             console.log('delete done')
             response.status(204).send({note: 'delete done'})
           })
           .catch(error => {
             console.log(error)
             response.status(500).end()
           })
  })

const PORT = process.env.PORT
app.listen(PORT, () =>{
  console.log(`Server running on PORT:${PORT}`)
})
