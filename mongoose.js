const mongoose = require('mongoose')
const { response } = require('express')

if (process.argv.length < 3) {
  console.log('Please give pass')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}` +
  `@fullstackopen.qyyfr.mongodb.net/note-app` +
  `?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Hello there',
  date: new Date(),
  important: true,
})

note.save().then(result => {
  console.log('Note saved!')
  console.log('result: ', result)
  mongoose.connection.close()
})

// Note.find({ important: true }).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })