var usuarioRotas = require('../routes/usuarios.js');

var express = require('express');
var bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'test';

const assert = require('assert');
const path = require('path');

module.exports = function(){
	var app = express();
	app.set("port", 3000);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	// Serve todos arquivos em public
	// Servimos todos os arquivos em public
	app.use(express.static('./public'));
	// Adiciona rotas da api
	usuarioRotas.setApp(app);
	// Use connect method to connect to the server
	MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
		assert.equal(null, err);
		const db = client.db(dbName);
		//db to routes here!
		usuarioRotas.setDb(db);
  		//client.close();
	});

	// Tudo que sobra direcionamos para o index.html
	// ex: localhost:3000/show não vai cair em nenhum anterior
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../public/index.html'));
	});
	return app;
}