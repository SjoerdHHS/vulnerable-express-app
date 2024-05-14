var { Client } = require('pg')
var express = require("express");

var port = 8081;



var client = new Client({
  user: "postgres",
  password: "SYAII2LWftDyY3ft",
  host: "localhost",
  port: 5432,
})
client.connect()

var main = async () => {
  await client.query(`
    create table if not exists users
    (
        id       serial constraint users_pk primary key,
        email    text not null,
        name     text not null,
        password text,
        administrator boolean
    );
    create unique index if not exists users_email_uindex on users (email);
    create unique index if not exists users_id_uindex on users (id);
  `)

  var app = express();

  app.set("view engine", "pug");

  app.get('/form', function (req, res) {
    res.render("form", { name: req.query.name })
  })

  app.use(express.json());

  app.patch('/user/:id', async function(req, res) {
    const { id } = req.params;

    if(!id) { 
      res.send("Id not set"); 
      res.end()
    }

    if (Object.keys(req.body).length === 0) {
        return res.status(400).send('No data provided.');
    }

    const query = (() => {
      let q = `UPDATE users SET `;

      for (const [key, value] of Object.entries(req.body)) {
        console.log(`Key: ${key}, Value: ${value}`);

        if(value === 'number') q += `${key} = ${value}, `
        if(value !== 'number') q += `${key} = '${value}', `


      }
      q = q.substring(0, q.length - 2)
      q += ` WHERE id = ${id}`
      return q;
    })();

    console.log(query)

    const result = await client.query(query);
    res.end('ok');

  })

  app.get('/user/:id', async function (req, res) {
    try {
      var user = await client.query(`select *
                                     from users
                                     where id = ${req.params.id}`)
      res.send(user.rows[0]);
    } catch (e) {
      console.error(e.message)
      res.send({ "error": e.message });
    }
  })

  app.listen(port);

  return `Listening on port ${port}`
}

main()
  .then(console.log)
  .catch(console.error)