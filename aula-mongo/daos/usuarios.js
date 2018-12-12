
var _db;

module.exports.setDb = function(db){
	_db = db;
} 

module.exports.inserirUsuario = function(_nome, _matricula,  _ramal, _e_mail){
	_db.collection("usuarios").insert({nome:_nome, matricula: _matricula, ramal: _ramal, e_mail: _e_mail});
}

module.exports.listarUsuarios = function(){
	_db.collection("usuarios").find({});
}

module.exports.deletarUsuario = function(_matricula){
	_db.collection("usuarios").remove({matricula:_matricula});
}
