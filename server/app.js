// this is a server js

import express from "express";
import dotenv from "dotenv";
import axios from "axios";



const app = express();
const port = 4000

dotenv.config()
const apikey = process.env.API_KEY



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/prompt', async (req, res) => {
  // const result = await axios.post('https://modelslab.com/api/v6/realtime/text2img', 
  // {
  //   "key" : apikey,
  //   "prompt": req.query.prompt,
  //   "negative_prompt": "bad quality",
  //   "width": "512",
  //   "height": "512",
  //   "safety_checker": false,
  //   "seed": null,
  //   "samples":1,
  //   "base64":false,
  //   "webhook": null,
  //   "track_id": null
  // },
  // {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  // // result.data.output[0] is the output link


  // testing purpose: https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/d6003dc0-be83-4514-a612-d001c9036c5f-0.png
  res.json({ output: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/d6003dc0-be83-4514-a612-d001c9036c5f-0.png' });

})


app.listen(port, () => {
  // server online
  console.log(`Server is running on port ${port} at http://localhost:${port}`);
})