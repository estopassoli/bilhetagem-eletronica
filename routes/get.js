const fs = require('fs')
const path = require('path')

//s
exports.getRouter = (app) => {
    app.get('/getdata', (req, res) => {
        let files = fs.readdirSync(path.resolve(__dirname, '../db/'))
        let dat = ''
        if (req.query.token == 'acredite') {
            for (let i in files) {

                let file = fs.readFileSync(path.resolve(__dirname, '../db/' + files[i]), 'utf-8')
                console.log(file)
                dat += file;
            }
            res.end(dat)
        } else {
            res.end('access denied')
        }
    })
    app.get('/download-one', (req, res) => {
        let files = fs.readdirSync(path.resolve(__dirname, '../db/'))
        const file = `${req.query.date}_${req.query.sentido}_${req.query.linha}.csv`;
        let i = files.includes(file)
        if (i) {
            let download = path.resolve('./db/' + file)
            console.log(download)
            res.sendFile(download)
        }
    })
    app.get('/api/v1/bilhetagens-disponiveis', (req, res) => {
        let files = fs.readdirSync(path.resolve(__dirname, '../uploads'))
        let resp = '';
        for (let i in files) {
            if (files[i] != 'ignore') {
                resp += `<option value="${files[i].split('.')[0]}">${files[i].split('.')[0]}</option>`
            }
        }
        res.json(resp)
    })
    app.get('/api/v1/bilhetagens-digitadas', (req, res) => {
        let files = fs.readdirSync(path.resolve(__dirname, '../db'))
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