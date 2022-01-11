const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'test',
      database : 'smartDB'
    }
});



const app = express();

app.use(express.json());
app.use(cors())


app.get('/', (req, res) => { res.send('success') })

app.post('/signin', signin.handleSignin(knex, bcrypt)) //fancy way of doing f(x)(y)
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, knex)} )
app.put('/image', (req, res) => { image.handleImage(req, res, knex)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})




app.listen(process.env.PORT, () => {
    console.log('app is running on port 3000');
})


