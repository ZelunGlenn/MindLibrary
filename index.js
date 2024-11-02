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

app.post('/create', async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  const response = await axios.get('http://localhost:4000/prompt', { 
    params: { prompt }
  });
  const image = response.data.output;
  res.render('index', { image });
})


app.listen(port, () => {
  console.log(`Server is running on port ${port} at http://localhost:${port}`);
})