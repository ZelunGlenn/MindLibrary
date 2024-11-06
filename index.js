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

app.get('/detail', async (req, res) => {
  const image = req.query.image_url;
  const detail = await axios.get('http://localhost:4000/detail', {
    params: { image }
  });
  const result = detail.data.detail.rows[0]
  res.render('detail', { image_detail: result });
})


app.post('/delete', async (req, res) => {
  const delete_image = req.body.image_delete
  const message = await axios.delete('http://localhost:4000/delete', {
    params: { image: delete_image},
  })
  console.log(message.data.message)
  res.redirect('/gallery')
})

app.post('/create', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.get('http://localhost:4000/prompt', { 
      params: { prompt }
    });
    const image = response.data.output;
    res.render('index', { image, prompt });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred' });
  }
})

app.post('/save', async (req, res) => {
  await axios.post('http://localhost:4000/save', {
    params: { 
      image: req.body.image_url,
      prompt: req.body.prompt
     }
  })
  res.redirect('/')
})


app.listen(port, () => {
  console.log(`Server is running on port ${port} at http://localhost:${port}`);
})
