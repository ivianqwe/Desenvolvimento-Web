const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://testecrudemongo:qweqwe12@ds048878.mlab.com:48878/testecrudemongo'

MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) =>{
	if(err) return console.log(err);
	db = client.db('testecrudemongo');

	app.listen(5000, function(){
	console.log('server running on port 5000')
	});	
});

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index.ejs')
});

app.get('/infomativos', (req, res) => {
  res.render('infomativos.ejs')
});

app.get('/', (req, res) =>{
	var cursor = db.collection('data').find();
});

app.get('/show', (req, res) => {
	db.collection('data').find().toArray((err, results) => {
		if(err) return console.log(err);

		res.render('show.ejs', {data: results})
	});
});

app.post('/show', (req, res) => {
	db.collection('data').insertOne(req.body, (err, result) =>{
		if (err) return console.log(err);

		console.log('salvo no banco');
		res.redirect('/show');
	});
});


app.route('/edit/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit.ejs', { data: result })
  })
})
.post((req, res) => {
  var id = req.params.id
  var matricula = req.body.Matricula
  var nome = req.body.Nome

  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set: {
      Matricula: matricula,
      Nome: nome
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show')
    console.log('Atualizado no Banco de Dados')
  })
})



app.route('/delete/:id')
.get((req, res) => {

  var id = req.params.id

  db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)

    console.log('Deletado do Banco de Dados!')
    res.redirect('/show')
  })
})

	

















