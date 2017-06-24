var mysql = require("mysql");

function ROUTER(router, pool, md5) {
    var self = this;
    self.handleRoutes(router, pool, md5);
}

ROUTER.prototype.handleRoutes = function(router, pool, md5) {
    var self = this;

    router.get("/usuarios", function(req, res) {
        var query = "SELECT * FROM ??";
        var vars = ["usuario"];
        query = mysql.format(query, vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false,  "usuarios" : rows});
                }
            });
        });
    });

    router.get("/usuarios/:id", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=?";
        var vars = ["usuario"
          , "usuario_id"
          , req.params.id
        ];
        query = mysql.format(query,vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false,  "usuarios" : rows});
                }
            });
        });
    });

    router.post("/usuarios", function(req, res) {
        var query = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
        var vars = ["usuario"
          , "email"
          , "nome"
          , "senha"
          , req.body.email
          , req.body.nome
          , md5(req.body.senha)
        ];
        query = mysql.format(query, vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false, "details": rows});
                }
            });
        });
    });

    router.put("/usuarios/:id", function(req, res) {
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        var vars = ["usuario"
          , "email", req.body.email
          , "nome", req.body.nome
          , "senha", md5(req.body.senha)

          , "usuario_id", req.params.id
        ];
        query = mysql.format(query, vars);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false, "details": rows});
                }
            });
        });
    });

    router.delete("/usuarios/:id", function(req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["usuario",
          "usuario_id"
          , req.params.id
        ];
        query = mysql.format(query,table);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err) {
                    res.status(400).send({"error": true, "details": err});
                } else {
                    res.status(200).send({"error": false, "details": rows});
                }
            });
        });
    });
}

module.exports = ROUTER;
