var controller = require("../controllers/usuarios.js");


module.exports.setApp = function(app){
	app.get("/usuarios",controller.listarUsuarios);
	app.get("/usuarios/:id",controller.obterUsuario);
	app.post("/api/usuarios",controller.inserirUsuario);
	app.delete("/rm_usuario/:id",controller.deletarUsuario);
}

module.exports.setDb = function(db){
	controller.setDb(db);
}

