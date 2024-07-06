const {join,resolve} = require('path');
const express = require('express');
const {readFile,readdir} = require('fs');
const {max, log} = require('mathjs');
const app = express();
const {trimTitle,cleanData} = require('./modules/cleaner.js')
const PORT = 8000;

const dirPath = join(resolve(__dirname,'Novel'));

let lastCh = 0;

app.set('view engine','ejs');
app.use(express.static(join(resolve(__dirname,'public'))))
app.use(express.json());

app.get('/',(req,res) => {
    res.render('index',{
        linkFirst:'/chapter/1',
        linkPrev:'#prev',
        linkLast:'last'
    })
})

app.get('/chapter/:num', (req,res) => {
    const {num} = req.params;
    readdir(dirPath,(err,fileNames) => {
        lastCh = max(...(fileNames.map(e => parseInt(e.split('-')[1]))))
        // console.log(lastCh);
        const chapterName = fileNames.find(e => e.includes(`Chapter - ${num} -`));
        readFile(join(resolve(__dirname,'Novel',chapterName)),'utf-8',(err,data) => {
            res.render('chapter',{
                name:trimTitle(chapterName),
                content:cleanData(data)
            })
        })
    })
})

app.get('/getLastCh',(req,res) => {
    res.json({
        lastChapter:lastCh,
        firstCh:1,
    })
})

app.listen(PORT,() => console.log(`App is listening on port: ${PORT}`))