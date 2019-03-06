const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log(JSON.stringify(req))
})

app.listen(3000, () => console.log('Example app listening on port 80!'))