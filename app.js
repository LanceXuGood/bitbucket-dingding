const express = require('express')
const bodyParser = require('body-parser')
const requset = require('superagent')
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
  request
    .post('https://oapi.dingtalk.com/robot/send?access_token=b57e5b4ed545bb728fc4c4412a8c669eee17e5b3b2a164653cbf1b9653d5e4f1')
    .send({
        "msgtype": "markdown",
        "markdown": {"title":"杭州天气", "text":"[天气](http://www.thinkpage.cn/) ",}
    })
    .set('Accept', 'application/json')
    .then(res => {
        console.log(res)
    });
  

})
app.listen(3000, () => console.log('Example app listening on port 3000!'))