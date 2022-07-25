const express = require('express');
const cors = require('cors');
const loginRoutes = require('./routes/login');
const usersRoutes = require('./routes/users');
const charactersRoutes = require('./routes/characters');
const moviesRoutes = require('./routes/movies');
const unionRoutes = require('./routes/union_mov_char');
const genderRoutes = require('./routes/gender');
const app = express();

app.use(cors());
app.use(express.json());

app.listen(8000, () => {
    console.log('Listen on port: 8000');
})

/* ROUTES*/
app.use('/login', loginRoutes);
app.use('/users', usersRoutes);
app.use('/characters', charactersRoutes);
app.use('/movies', moviesRoutes);
app.use('/union', unionRoutes);
app.use('/gender', genderRoutes);

/* ERROR HANDLER - RESET APP */
process.on('uncaughtException', function (err) {
    console.log('Error General: ' + err);
});