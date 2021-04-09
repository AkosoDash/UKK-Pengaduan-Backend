module.exports = (app, db) => {
  let sql = ""
  // Testing Endpoint
  app.get('/report', (req, res) => {
    res.send('Report API')
  })

  // Add Report
  app.post('/report', (req, res) => {
    const {
      title,
      content,
      status,
      id_user
    } = req.body
    sql = `insert into report (title, content, status, id_user)
    values ("${title}", "${content}", 'Menunggu', '${id_user}')`
    db.query(sql, (err, res) => {
      if (err)
        throw err
    })
  })

  // Get Report With Pending Status
  app.get('/report/user/pending', (req, res) => {
    sql = `SELECT id_report, username, title, content, response, date_created, status FROM user LEFT JOIN report ON user.id_user = report.id_user WHERE status='Menunggu';`
    db.query(sql, (err, data) => {
      if (err) throw err
      else res.send(data)
    })
  })

  app.get('/report/user/history', (req, res) => {
    sql = `select * from report where status='Disetujui'`
    db.query(sql, (err, data) => {
      if (err) throw err
      else res.send(data)
    })
  })

  app.get('/report/user/done', (req, res) => {
    sql = `SELECT id_report, username, title, content, response, date_created, status FROM user LEFT JOIN report ON user.id_user = report.id_user WHERE status='Selesai' OR status='Ditolak';`
    db.query(sql, (err, data) => {
      if (err) throw err
      else res.send(data)
    })
  })

  app.get('/report/user/total', (req, res) => {
    sql = `select * from report`
    db.query(sql, (err, data) => {
      if (err) throw err
      else res.send(data)
    })
  })

  // Get Report By User ID
  app.get('/report/user/:id', (req, res) => {
    sql = `select * from report where id_user = ${req.params.id}`
    db.query(sql, (err, data) => {
      if (err) throw err
      else res.send(data)
    })
  })

  // Update Status Of The Report By ID
  app.put('/report/user/:id/upStatus', (req, res) => {
    sql = `update report set status = '${req.body.status}', response='${req.body.response}', id_admin=${req.body.id_admin} where id_report = ${req.params.id}`
    db.query(sql, (err, data) => {
      if (err) throw err
      else res.send(data)
    })
  })

  // Delete Report By ID
  app.delete('/report/user/:id/del', (req, res) => {
    sql = `delete from report where id_report = ${req.params.id}`
    db.query(sql, (err, data) => {
      if (err) throw err
      else res.send(data)
    })
  })
}
