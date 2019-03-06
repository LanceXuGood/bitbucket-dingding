const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log(req)
    res.send('ok')
})

app.post('/dingding', (req, res) => {
    console.log(req)
    res.send('ok')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))