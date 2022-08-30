const fs = require('fs')
const path = require('path')


exports.getRouter = (app) => {
    app.get('/getdata', (req, res) => {
        let dir = fs.readdirSync(path.resolve(__dirname, './db/'))
        for (let i in dir) {
            const file = path.resolve(__dirname, './db/' + dir[i])
            req.query.token == 'acredite' ? res.sendFile(file) : res.send('Access denied')
        }
    })
    app.get('/api/v1/bilhetagens-disponiveis', (req, res) => {
        let files = fs.readdirSync(path.resolve(__dirname, './uploads'))
        let resp = '';
        for (let i in files) {
            resp += `<option value="${files[i].split('.')[0]}">${files[i].split('.')[0]}</option>`
        }
        res.json(resp)
    })
    app.get('/api/v1/bilhetagens-digitadas', (req, res) => {
        let files = fs.readdirSync(path.resolve(__dirname, './db'))
        let resp = '';
        for (let i in files) {
            resp += `<option value="${files[i].split('.')[0]}">${files[i].split('.')[0]}</option>`
        }
        res.json(resp)
    })
    app.get('/delete', (req, res) => {
        req.query.token == 'acredite' ? res.render('delete.html') : res.send('Access denied')
    })
    app.get('/upload', (req, res) => {
        req.query.token == 'acredite' ? res.render('upload.html') : res.send('Access denied')

    })
}