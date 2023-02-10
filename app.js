require('dotenv').config()
const express = require('express');
const cors = require('cors')
const router = require('./routes');
const app = express();
const { PORT } = process.env
const port = PORT || 3000;

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())


app.use(router)


app.listen(port, () => {
    console.log(`YuGiOh!Play server active on port ${port}`);
})