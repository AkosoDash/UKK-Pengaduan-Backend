module.exports = (app, db) => {
    let sql = "";
  
    app.post("/admin", (req, res) => {
      const { email, password } = req.body;
      const tokenAdmin = Math.random() * (69 + 420);
      sql = `select * from admin where email=? and password=?`;
      db.query(sql, [email, password], (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          res.json({ ...data[0], tokenAdmin });
        } else {
          res.json({ message: "Email/kata sandi tidak cocok, coba lagi" });
        }
      });
    });
  
    app.delete("/admin/user/:id/delete", (req, res) => {
      sql = `delete from user where id_user = ${req.params.id}`
      db.query(sql, (err, data) => {
        if (err) throw err
        else res.send(data)
      })
    })
    
  };
  