const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'));

morgan.token('person', function(req, res, person) {
    return JSON.stringify(req.body)
})

let persons = [
   {
     name: "Moha Amani",
     number: "09113525111",
     id: 1
   },

   {
     name: "Ary Amani",
     number: "09113525120",
     id: 2
   },
   {
     name: "Ara Amani",
     number: "09113525129",
     id: 3
   }
]

const generateId = () => {
  if (persons.length > 0 ) {
    const maxId = Math.max(...persons.map(n => n.id))
    return maxId + 1
  }
  else {
    return 1
  }
}

app.get('/',(request,response) => {
  response.send('<h1> Mohammad Amani </h1>')
})

app.get('/info',(request,response) => {
  const numberOfPersons = persons.length
  const date = new Date()
  response.send(`<h3>phonebook has info for ${numberOfPersons} persons </h3>`+
      `<p> ${date} </p>`
 )
})

app.get('/api/persons',(request,response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number (request.params.id)
  const person = persons.find( (person) => person.id === id )
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id',(request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter( (person) => person.id !== id )
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  const number = body.number
  const name = body.name
  if (!number || ! name) {
    return response.status(400).json({
      error: " name or number missing"
    })
  }
  if (persons.find( (person) => person.name === name )) {
       return response.status(400).json({
       error: "name must be unique"
     })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  persons = persons.concat(person)
  response.json(persons)

})

const PORT = 3001
app.listen(PORT, () =>{
  console.log(`Server running on PORT${PORT}`)
})
