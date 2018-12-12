function chamada_expressv4_config(){
	var http = require('http');
	var app = require('./config/expressv4.js')();
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express V4 Server escutando na porta '+app.get('port'));
	});
}

chamada_expressv4_config();