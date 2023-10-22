const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

const app = express()

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


let notes = [
]

/* const notes = noteList.map(note => {
  const dbNote = new Note(note)
  dbNote.save().then(result => {
  console.log('note saved!')
  })
})
*/



  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
  })
})


  app.post('/api/notes', (request,response) => {
    const body = request.body

    if (!body.content) {
      return response.status(400).json({error: 'content missing'})
    }

    const note = new Note({
      content: body.content,
      important: body.important || false,
    })


    note.save().then(savedNote => {
      response.json(savedNote)
    })
  })

  app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
        .then(note => {
      if (note){
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
       .catch( error => {
         console.log(error)
         response.status(400).send({ error: 'malformatted id'})
       })
    })


  app.delete('/api/notes/:id', (request, response) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
          response.status(204).end()
        })
        .catch(error => {
          console.log(error)
          response.status(400).send({ error: 'malformatted id'})
        })
  })

  app.put('/api/notes/:id', (request, response) => {
    const body = request.body
    const note = {
      content: body.content,
      important: body.important,
    }
    Note.findByIdAndUpdate(request.params.id, note, {new: true})
        .then(updatedNote => {
          response.json(updatedNote)
        })
        .catch(error => {
          console.log(error)
          response.status(400).send({ error: 'malformatted id'})
        })
  })



  app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
