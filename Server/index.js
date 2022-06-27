/*** CMRS Server - Node.js - index.js ***/

const { Pool } = require('pg');

var hapi = require('hapi');
var mqtt = require('mqtt')；
var url = require('url');

var server = new hapi.Server();
var port = Number(process.env.PORT || 4444);

server.connection({ port: port, routes: { cors: true } });

// Parse URL and auth
var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
var auth = (mqtt_url.auth || ':').split(':');

// Create a client connection
var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, 
{
  username: auth[0],
  password: auth[1]
});

var mqttPublish = function(topic, msg)
{
  client.publish(topic, msg, function() 
  {
    console.log('msg sent: ' + msg);
  });
}

server.route([
/* IoT device operations */
  {
    method: 'POST',
    path: '/device/control',
    handler: function (request, reply) 
    {
      var deviceInfo = 'dev' + request.payload.deviceNum + '-' + request.payload.command;
      reply(deviceInfo);
      mqttPublish('device/control', deviceInfo, 
      {
        'qos' : 2
      });
    }
  },
/* Database operations */
  {
    // get a user's information by the username
    // for login purpose
    method: 'POST',
    path: '/db',
    handler: function (request, reply) 
    {
      var psql = "";
      var c  = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });
      if(request.payload.name)
      {
        psql = "SELECT * FROM people WHERE name='" + request.payload.name + "';";
      }
      try 
      {   
        c.connect();
        var result = c.query(psql);
        reply(result);
        c.end();
      } 
      catch (err) 
      {
        console.error(err);
        reply("Error " + err);
        c.end();
      }
      c.end();
    }
  },
  {
    // get the users with the specific role
    // roles are:
    // 0 - barista students
    // 1 - staff/managers
    // 2 - administrator
    method: 'POST',
    path: '/get-u',
    handler: function (request, reply) 
    {
      
      psql = "SELECT * FROM people WHERE role=" + request.payload.role + ";";
      
      try 
      {
        var c  = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });
        c.connect();
        var result = c.query(psql);
        reply(result);
        c.end();
      } 
      catch (err) 
      {
        console.error(err);
        reply("Error " + err);
      }
    }
  },
  {
    // update a user's activation status: activated/deactivated
    // the CMRS functions are only available to activatied users
    method: 'POST',
    path: '/update-activated',
    handler: function (request, reply) 
    {

      psql = "UPDATE people SET activated = " + request.payload.activated + " WHERE name = '" + request.payload.name + "';";

      try 
      {
        var c  = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });
        c.connect();
        var result = c.query(psql);
        reply(result);
        c.end();
      } 
      catch (err) 
      {
        console.error(err);
        reply("Error " + err);
      }
    }
  },
  {
    // add a new user
    method: 'POST',
    path: '/create-user',
    handler: function (request, reply) 
    {

      psql = "INSERT INTO people VALUES('" + request.payload.name + "','" + request.payload.key + "'," + request.payload.role + ",null,true);";

      try 
      {
        var c  = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });
        c.connect();
        var result = c.query(psql);
        reply(result);
        c.end();
      } 
      catch (err) 
      {
        console.error(err);
        reply("Error " + err);
      }
    }
  },
  {
    // check if a username has been taken
    method: 'POST',
    path: '/name-duplication-check',
    handler: function (request, reply) 
    {
      
      psql = "SELECT * FROM people WHERE name = '" + request.payload.name + "';";
      
      try 
      {
        var c  = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });
        c.connect();
        var result = c.query(psql);
        reply(result);
        c.end();
      } 
      catch (err) 
      {
        console.error(err);
        reply("Error " + err);
      }
    }
  },
  {
    // delete a user by its username
    method: 'POST',
    path: '/delete-u',
    handler: function (request, reply) 
    {
      
      psql = "DELETE FROM people WHERE name = '" + request.payload.name + "';";
      
      try 
      {
        var c  = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });
        c.connect();
        var result = c.query(psql);
        reply(result);
        c.end();
      } 
      catch (err) 
      {
        console.error(err);
        reply("Error " + err);
      }
    }
  },
  {
    // get the information of a specific machine/ all available coffee machines
    method: 'POST',
    path: '/get-m',
    handler: function (request, reply) 
    {
      if(request.payload.machineid == null)
      {
        if(request.payload.role == 0)
        {
          // if the current user is a barista student,
          // only get the coffee machines which are not occupied
          psql = "SELECT * FROM machine WHERE power=false;";
        }
        else
        {
          psql = "SELECT * FROM machine;";
        }
      }
      else
      {
        // if the machine id is specified, get the information of that machine
        psql = "SELECT * FROM machine WHERE id=" + request.payload.machineid + ";";
      }
      
      try 
      {
        var c  = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });
        c.connect();
        var result = c.query(psql);
        reply(result);
        c.end();
      } 
      catch (err) 
      {
        console.error(err);
        reply("Error " + err);
      }
    }
  },
  {
    // update a coffee machine's status: occupied/available
    method: 'POST',
    path: '/update-m',
    handler: function (request, reply) 
    {

      psql = "UPDATE machine SET stat = " + request.payload.stat + " WHERE id = " + request.payload.id + ";";

      try 
      {
        var c  = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });
        c.connect();
        var result = c.query(psql);
        reply(result);
        c.end();
      } 
      catch (err) 
      {
        console.error(err);
        reply("Error " + err);
      }
    }
  },
  {
    // add a new coffee machine
    method: 'POST',
    path: '/add-m',
    handler: function (request, reply) 
    {

      psql = "INSERT INTO machine VALUES(" + request.payload.id + ",true,false);";

      try 
      {
        var c  = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });
        c.connect();
        var result = c.query(psql);
        reply(result);
        c.end();
      } 
      catch (err) 
      {
        console.error(err);
        reply("Error " + err);
      }
    }
  },
  {
    // check if the machine id has existed
    method: 'POST',
    path: '/id-duplication-check',
    handler: function (request, reply) 
    {
      
      psql = "SELECT * FROM machine WHERE id = " + request.payload.id + ";";
      
      try 
      {
        var c  = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });
        c.connect();
        var result = c.query(psql);
        reply(result);
        c.end();
      } 
      catch (err) 
      {
        console.error(err);
        reply("Error " + err);
      }
    }
  },
  {
    // delete a removed coffee machine by its machine id
    method: 'POST',
    path: '/delete-m',
    handler: function (request, reply) 
    {
      
      psql = "DELETE FROM machine WHERE id = " + request.payload.id + ";";
      
      try 
      {
        var c  = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });
        c.connect();
        var result = c.query(psql);
        reply(result);
        c.end();
      } 
      catch (err) 
      {
        console.error(err);
        reply("Error " + err);
      }
    }
  },
  {
    // update a coffee machine's machine id
    method: 'POST',
    path: '/update-u-mid',
    handler: function (request, reply) 
    {
      
      psql = "UPDATE people SET machineid = " + request.payload.machineid + " WHERE name='" + request.payload.name + "';";
      
      try 
      {
        var c  = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });
        c.connect();
        var result = c.query(psql);
        reply(result);
        c.end();
      } 
      catch (err) 
      {
        console.error(err);
        reply("Error " + err);
      }
    }
  },
  {
    // update machine power information when turn ON/OFF a coffee machine
    method: 'POST',
    path: '/update-m-power',
    handler: function (request, reply) 
    {
      
      psql = "UPDATE machine SET power = " + request.payload.power + " WHERE id=" + request.payload.machineid + ";";
      
      try 
      {
        var c  = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });
        c.connect();
        var result = c.query(psql);
        reply(result);
        c.end();
      } 
      catch (err) 
      {
        console.error(err);
        reply("Error " + err);
      }
    }
  },
]);

// Start the server
server.start();



/*** References ***/
// https://github.com/vynci/MQTT-REST-API
