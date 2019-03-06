const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 

app.get('/', (req, res) => {
    console.log(req)
    res.send('ok')
})

app.post('/dingding', (req, res) => {
    console.log(req.body)
    res.send('ok')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))