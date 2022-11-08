const connectToMongo = require("./db")
connectToMongo();
var cors = require('cors')

const express = require('express')
const app = express()
const port = 5000



app.use(cors())

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
 

app.use('/api/auth',require('./routes/auth'))
app.use('/api/login',require('./routes/login'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})