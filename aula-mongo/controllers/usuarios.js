
var dao = require("../daos/usuarios.js");

module.exports.setDb = function(db){
	dao.setDb(db);
}

module.exports.listarUsuarios = function(req, res){
	
	var usuarios = dao.collections('test');
	var mostra_usuarios = [];

	usuarios.forEach(function(usuario){
		if(mostra_usuarios.matricula>=0){
			mostra_usuarios.push(usuario);
		}
	});
	res.json(mostra_usuarios);
};

module.exports.obterUsuario = function(req, res){
	var matricula = req.params.matricula;
	//var aluno = alunos.find(aluno => (aluno._id==id));
	var usuario = usuarios.find(function(usuario){
		if(usuario.matricula==matricula)
			return usuario;
		return null;
	});
	if(usuario)
		res.json(usuario);
	else
		res.status(404).send('Usuario não encontrado');
};
//inserir usuário
module.exports.inserirUsuario = function(req, res){
	 var nome = req.body.nome;
	 var matricula = req.body.matricula;
	 var ramal = req.body.ramal;
	 var e_mail = req.body.e_mail;
	 dao.inserirUsuario(nome, matricula, ramal, e_mail);
	 var novo_usuario = {nome:nome, matricula:matricula, ramal:ramal, e_mail:e_mail};
	 usuarios.push(novo_usuario);
	 console.log("nome: " + nome + "matrícula: " + matricula + "ramal: " + ramal + "e_mail: " + e_mail);
	 res.end('yes');
}


module.exports.deletarUsuario = function (req, res){
	 var matricula = req.params.matricula;
	 dao.deletarUsuario(matricula);
	 console.log("matrícula: " + matricula);
	 var rm_usuario = {matricula:matricula};
	 usuarios.delete(rm_usuario);
	 res.end('yes');
}
