import express from 'express';
import axios from 'axios';
const app = express();
const port = 3000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// ejs is at server/views
app.set('views', 'server/views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index')
})

app.get('/gallery', async (req, res) => {
  const gallery = await axios.get('http://localhost:4000/view');
  res.render('gallery', {gallery: gallery.data.gallery})
})

app.post('/create', async (req, res) => {
  const { prompt } = req.body;
  const response = await axios.get('http://localhost:4000/prompt', { 
    params: { prompt }
  });
  const image = response.data.output;
  res.render('index', { image });
})

app.post('/save', async (req, res) => {
  await axios.post('http://localhost:4000/save', {
    params: { image: req.body.image_url }
  })
  res.redirect('/')
})


app.listen(port, () => {
  console.log(`Server is running on port ${port} at http://localhost:${port}`);
})