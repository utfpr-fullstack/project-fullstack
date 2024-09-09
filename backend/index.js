require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const compression = require('compression'); 
const rateLimit = require('express-rate-limit'); 
const xss = require('xss-clean'); 
const logger = require('./logger'); 
const apicache = require('apicache'); 

const UserRoutes = require('./routes/UserRoutes');
const MovieRoutes = require('./routes/MovieRoutes');

const app = express();
let cache = apicache.middleware;
// Middleware de compressão
app.use(compression());

// Middleware de XSS
app.use(xss()); 


app.use(express.json());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Configuração de Rate Limiting
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 100, 
    message: 'Muitas requisições feitas pelo seu IP. Tente novamente mais tarde.'
});


app.use(limiter);

// Aplicar cache em todas as rotas 
app.use(cache('5 minutes'));


app.use(express.static('public'));


app.use('/users', UserRoutes);
app.use('/movies', MovieRoutes);

// Middleware para tratamento de erros 
app.use((err, req, res, next) => {
    logger.error(err.stack); 
    res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`); 
});
