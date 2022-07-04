const conexao = require("../config/database");

const UsuarioSchema = conexao.Schema({
  autor: {
    type: "String",
  },
  titulo: {
    type: "String",
  },
  dataPub: {
    type: "Date",
  },
  foto: {
    type: "String",
  },
});

module.exports = conexao.model("Usuario", UsuarioSchema);
