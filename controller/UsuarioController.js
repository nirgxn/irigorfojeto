const Usuario = require("../model/Usuario");

function abreadd(req, res) {
  res.render("usuario/add.ejs");
}
function add(req, res) {
  var usuario = new Usuario();
  usuario.autor = req.body.autor;
  usuario.titulo = req.body.titulo;
  usuario.dataPub = new Date(req.body.dataPub);
  usuario.foto = req.file.filename;
  usuario.save(function (err, result) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/usuario/lst");
    }
  });
}
function lst(req, res) {
  Usuario.find({}).then(function (usuarios) {
    res.render("usuario/lst.ejs", { Usuarios: usuarios });
  });
}
function filtro(req, res) {
  var pesquisa = req.body.pesquisa;
  Usuario.find({ nome: new RegExp(pesquisa, "i") }).then(function (usuarios) {
    res.render("usuario/lst.ejs", { Usuarios: usuarios });
  });
}
function abreedt(req, res) {
  Usuario.findById(req.params.id).then(function (usuario) {
    res.render("usuario/edt.ejs", { Usuario: usuario });
  });
}
function edt(req, res) {
  Usuario.findByIdAndUpdate(
    req.params.id,
    {
      autor: req.body.autor,
      titulo: req.body.titulo,
      dataPub: req.body.dataPub,
      foto: req.file.filename,
    },
    function (err, result) {
      if (err) {
        res.send("Aconteceu o seguinte erro: " + err);
      } else {
        res.redirect("/usuario/lst");
      }
    }
  );
}
function deleta(req, res) {
  Usuario.findByIdAndDelete(req.params.id).then(function (valor) {
    res.redirect("/usuario/lst");
  });
}

module.exports = { abreadd, add, lst, filtro, abreedt, edt, deleta };
