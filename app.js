const express = require('express')
const bodyParser = require('body-parser')
const request = require('superagent')
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
  const { username } = data.actor
  const { fullName, links } = data.repository
  await request
    .post('https://oapi.dingtalk.com/robot/send?access_token=b57e5b4ed545bb728fc4c4412a8c669eee17e5b3b2a164653cbf1b9653d5e4f1')
    .send({
        "msgtype": "markdown",
        "markdown": {
            "title":fullName,
            "text": `${username} 推送新变动到 xxx`
        }
    })
    .set('Accept', 'application/json')
    .then(res => {
        
    });
  

})
app.listen(3000, () => console.log('Example app listening on port 3000!'))

// push
// { 
//     actor: { username: 'xuyan', displayName: 'xuyan' },
//     repository: { 
//         scmId: 'git',
//         project: { key: 'TES', name: 'test_dingding' },
//         slug: 'dingdingtalk',
//         links: { self: [Array] },
//         fullName: 'TES/dingdingtalk',
//         ownerName: 'TES',
//         public: false,
//         owner: { username: 'TES', displayName: 'TES' } 
//     },
//     push: { changes: [ [Object] ] } 
// }