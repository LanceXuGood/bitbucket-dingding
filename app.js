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
  const { fullName, links, ownerName, slug, project } = data.repository
  const { changes } = data.push
  // { self: [ { href: 'https://code.learnta.cn/projects/TES/repos/dingdingtalk/browse' } ] }
  const { href } = links.self[0]
  // 分支管理
  const branch = changes[0].new
  const target = branch.target
  // https://code.learnta.cn/projects/TES/repos/dingdingtalk/commits/800a46cfa75847923952c483577f41c721836d85
  const commitUrl = `https://code.learnta.cn/projects/${ownerName}/repos/${slug}/commits/${target.hash}`
  console.log(branch)
  if (changes) {
    await request
    .post('https://oapi.dingtalk.com/robot/send?access_token=2d712b6b2ddfec262954ce18f9c3878cec3b805baf7f13262e15affcc442139f')
    .send({
        "msgtype": "markdown",
        "markdown": {
            "title":fullName,
            "text": `# Push\n 程序猿: **${username}** 推送新变动到 ${project.name} \ **${branch.name}** 分支\n > [点击查看详细内容](${commitUrl})`
        }
    })
    .set('Accept', 'application/json')
    .then(res => {
        
    });
  }

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