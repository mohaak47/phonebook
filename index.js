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

app.get('/api/persons/:id',(request,response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
   })

     person.save()
           .then(savedPerson => {
             response.json(savedPerson)
          })
          .catch((error) => {
          if (error.name === "CastError"){
            return response.status(400).send({error: 'malformatted id'})
          } else if (error.name === "ValidationError") {
            return  response.status(400).json({error: error.message})
          }
        })
    })


  app.put('/api/persons/:id', (request,response) => {
    const body = request.body
    const person = {
      name: body.name,
      number: body.number,
    }
    Person.findByIdAndUpdate(request.params.id, person)
          .then(updatedPerson => {
            response.json(updatedPerson)
          })
          .catch(error => {
            console.log(error)
            response.status(500).end()
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
     const id = request.params.id
     console.log(id, typeof id)
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
