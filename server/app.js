// this is a server js

import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import pg from "pg";


const app = express();
const port = 4000

dotenv.config()
const apikey = process.env.API_KEY

let tempGallery = []

const password = process.env.PASSWORD;
const p = process.env.PORT

const db = new pg.Client({
  user: 'postgres',
  password: password,
  host: 'localhost',
  port: p,
  database: 'gallery'
})

db.connect()


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/prompt', async (req, res) => {
  const result = await axios.post('https://modelslab.com/api/v6/realtime/text2img', 
  {
    "key" : apikey,
    "prompt": req.query.prompt,
    "negative_prompt": "bad quality",
    "width": "512",
    "height": "512",
    "safety_checker": false,
    "seed": null,
    "samples":1,
    "base64":false,
    "webhook": null,
    "track_id": null
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // // result.data.output[0] is the output link
  res.json({ output: result.data.output[0] });



  // // testing because it has limited access to the API
  // res.json({ output: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/d6003dc0-be83-4514-a612-d001c9036c5f-0.png' });
})

app.post('/save', async (req, res) => {
  // // temp save into array
  // tempGallery.push(req.body.params.image)


  const image = req.body.params.image
  const prompt = req.body.params.prompt

  const result = await db.query("INSERT INTO images (url, prompt) VALUES ($1, $2) RETURNING *", [image, prompt])

  res.json({ message: result })
})

app.get('/view', async (req, res) => {
  // // temp view into array
  // res.json({ gallery: tempGallery })

  const result = await db.query("SELECT url, prompt FROM images")
  const images = result.rows

  res.json({ gallery: images })
})

app.get('/detail', async (req, res) => {
  // // temp view details into array
  // const result = tempGallery.find(image => image === req.query.image)

  const image_url = req.query.image
  const result = await db.query("SELECT url, prompt FROM images WHERE url = $1", [image_url])
  res.json({ detail: result })
})

app.delete('/delete', async (req, res) => {
  // temp delete into array
  // req.query.image
  const delete_image = req.query.image
  // tempGallery = tempGallery.filter(image => image !== delete_image)

  const result = await db.query("DELETE FROM images WHERE url = $1 RETURNING *", [delete_image])

  res.json({ result })
})

app.listen(port, () => {
  // server online
  console.log(`Server is running on port ${port} at http://localhost:${port}`);
})
