const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
res.send('Backend iniciado!');
});
app.listen(port, () => {
console.log(`Server rodando na porta ${port}`);
});