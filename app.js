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

app.post('/dingding', async (req, res) => {
  const data = req.body
  const { username } = data.actor;
  const { fullName, links } = data.repository;
  console.log(links, data.push)

})
app.listen(3000, () => console.log('Example app listening on port 3000!'))