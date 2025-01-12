const express = require('express');
const app = express();
const log = console.log;
const connect = () => {
          app.listen(process.env.PORT, () => {
                    log(`listening on port: ${process.env.PORT}`);
          });        
}
module.exports = connect;
