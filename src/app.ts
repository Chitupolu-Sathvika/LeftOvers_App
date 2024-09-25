import router from './routes/index.route';
import twilioClient from './services/twilio.service';
import { initMongoDb } from './db';

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT: number = parseInt(process.env.PORT || '5000');

initMongoDb()
   .then(() => {
      console.log('Connected to Db!');

      app.use(cors());
      app.use(bodyParser.json());
      app.use('/api/', router);

      twilioClient.initTwilio();

      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
         console.log(`http://localhost:${PORT}`);
      });
   })
   .catch((e) => console.error(e));
