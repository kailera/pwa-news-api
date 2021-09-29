import express from 'express';
import cors from 'cors';
import economy from './economy.json';
import world from './world.json';
import technology from './technology.json';
const app = express();

const GROUP_NEWS  = {
    economy,
    technology,
    world
}


app.get('/api', (req, res)=>{
    res.json({
        economy,
        world,
        technology
    })
})

app.get('/api/:subject', (req, res)=>{
    const { subject } = req.params ?? {}.subject;
    res.json(GROUP_NEWS[subject])
})

app.get('/api/:subject/:id', (req, res)=>{
    const { subject, id} = req.params;
    const allNews = GROUP_NEWS[subject];
    const news = allNews.value.find(news => news.id === id);
    res.json(news)
})

app.use(cors());
const PORT = process.env.PORT || 3080;



app.listen(PORT, ()=>{
    console.log (`Server online on port ${PORT}.`)
})
