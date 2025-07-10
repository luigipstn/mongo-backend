import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
console.log('MONGO_URI:', MONGO_URI);

if (!MONGO_URI) {
  throw new Error('Errore: MONGO_URI non definito! Controlla le variabili ambiente su Render');
}

const PORT = process.env.PORT || 10000;

const client = new MongoClient(MONGO_URI);
let db;

app.get('/prodotti', async (req, res) => {
  try {
    const prodotti = await db.collection('prodotti').find().toArray();
    res.json(prodotti);
  } catch (err) {
    res.status(500).send('Errore nel recupero dati');
  }
});

app.listen(PORT, async () => {
  try {
    await client.connect();
    db = client.db('studio-giaquinta');
    console.log(`API pronta su http://localhost:${PORT}`);
  } catch (err) {
    console.error('Errore connessione MongoDB:', err);
  }
});
