// server.js
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.json());           // per eventuali POST in futuro

// 👉 Variabili ambiente
const MONGO_URI = process.env.MONGO_URI;           // la metterai su Render
const PORT      = process.env.PORT || 10000;       // Render fornisce PORT

// 👉 Connessione a MongoDB Atlas
const client = new MongoClient(MONGO_URI);
let db; // la useremo dopo il connect

app.get('/prodotti', async (req, res) => {
  try {
    const prodotti = await db.collection('prodotti').find().toArray();
    res.json(prodotti);
  } catch (err) {
    res.status(500).send('Errore nel recupero dati');
  }
});

// 🏁 Avvio server
app.listen(PORT, async () => {
  try {
    await client.connect();
    db = client.db('test');      // cambia con il tuo nome DB se vuoi
    console.log(`API pronta su http://localhost:${PORT}`);
  } catch (err) {
    console.error('Errore connessione MongoDB:', err);
  }
});
