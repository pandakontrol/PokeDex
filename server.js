const express = require('express');
const path = require('path');
const app = express();
port = process.env.PORT;
// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, 'public')));

// Escuchemos en un puerto
app.listen(3000, () => {
    console.log(" * La PokeDex esta funcionando en http://localhost:3000");
});
