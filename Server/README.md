# CMRS Server
The CMRS Server is implemented on [Heroku](https://www.heroku.com/) with Node.js.   
## Heroku Dependencies
Two add-ons are used for this project:
1. CloudMQTT (IoT broker)
2. Heroku Postgres (Database)
## Database Tables
### machine
<table>
  <tbody>
    <tr>
      <td><b>Column</b></td>
      <td><b>Type</b></td>
      <td><b>Comment</b></td>
    </tr>
    <tr>
      <td>id</td>
      <td>Integer</td>
      <td>Coffee machine ID</td>
    </tr>
    <tr>
      <td>stat</td>
      <td>Boolean</td>
      <td></td>
    </tr>
    <tr>
      <td>power</td>
      <td>Boolean</td>
      <td>True: power on, False: power off</td>
    </tr>
  </tbody>
</table>

### people
<table>
  <tbody>
    <tr>
      <td><b>Column</b></td>
      <td><b>Type</b></td>
      <td><b>Comment</b></td>
    </tr>
    <tr>
      <td>name</td>
      <td>Text</td>
      <td>Username</td>
    </tr>
    <tr>
      <td>key</td>
      <td>Text</td>
      <td>Password</td>
    </tr>
    <tr>
      <td>role</td>
      <td>Integer</td>
      <td>0: barista student, 1: staff, 2: administrator</td>
    </tr>
    <tr>
      <td>machineid</td>
      <td>Integer</td>
      <td>The current coffee machine occupied by the user</td>
    </tr>
    <tr>
      <td>activated</td>
      <td>Boolean</td>
      <td>True: activated, False: de-activated</td>
    </tr>
  </tbody>
</table>

## References
- [vynci/MQTT-REST-API](https://github.com/vynci/MQTT-REST-API)
- [node-postgres-docs/content/features/3-pooling.mdx](https://github.com/brianc/node-postgres-docs/blob/master/content/features/3-pooling.mdx)
