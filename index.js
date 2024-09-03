const express = require('express');
const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://kv120720:kv120720@cluster0.u1ojfct.mongodb.net/e-commerce?retryWrites=true&w=majority';
const hbs = require('hbs');
const path = require('path');
const Users = require('./models/user')

const app = express();
const PORT = 4444;

app.use(async (req,res,next)=>{
    let user = await Users.findOne({
        _id: "66d37eed607dd39b91117b7b"
    });
    req.user = user;
    next();
})

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerPartials(path.join(__dirname, 'views/shop/partials'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res, next) => {
    try {
        res.render('index.hbs');
    } catch (err) {
        console.error("Rendering error: ", err);
        res.status(500).send('Internal Server Error');
    }
});

// app.get('/',(req,res,next)=>{
//     res.send('Hello World')
// })

const adminRouter = require('./routes/admin')
app.use('/admin',adminRouter);

const shopRouter = require('./routes/shop')
app.use('/shop', shopRouter)

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
