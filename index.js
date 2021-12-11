// module 추출 + Server Codes
// about path module: https://curryyou.tistory.com/361
const express = require('express');
const app = express();
const path = require('path')
const methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');
const { render } = require('ejs');

// https://bcho.tistory.com/887
// urlencoded: https://velog.io/@hyunju-song/body-parser%EC%9D%98-urlencoded%EB%8A%94-%EB%8F%84%EB%8C%80%EC%B2%B4-%EC%96%B4%EB%96%A4-%EC%97%AD%ED%95%A0%EC%9D%84-%ED%95%98%EB%8A%94-%EA%B1%B8%EA%B9%8C
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {
        id: uuidv4(),
        username: 'Todd',
        comment: 'lol'
    },
    {
        id: uuidv4(),
        username: 'Rex',
        comment: 'wtf'
    },
    {
        id: uuidv4(),
        username: 'Toni',
        comment: 'good job'
    },
    {
        id: uuidv4(),
        username: 'Mint',
        comment: 'yes i can'
    },
    {
        id: uuidv4(),
        username: 'John',
        comment: 'Lets go'
    }
]

// Routing Part

// render existing comment(above)
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

// page for creating new comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

// create new comment
app.post('/comments', (req, res) => {
    const {username, comment} = req.body
    comments.push({username, comment, id: uuidv4()})
    res.redirect('/comments')
})

// read existing comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

// update existing comment with edit.ejs
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

// udpate comment list
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params
    const newComment = req.body.comment
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newComment
    res.redirect('/comments')
})

// delete comment
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})

// localhost: 3000
app.listen(3000, () => {
    console.log('on port 3000!')
})
