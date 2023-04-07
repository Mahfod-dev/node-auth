require('dotenv').config();
require('colors');
require('express-async-errors');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const express = require('express');
const connectDB = require('./db/connect');
const app = express();

// middleware auth
const authenticate = require('./middleware/authentication');


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//Route files
const jobs = require('./routes/jobs');
const auth = require('./routes/auth');

app.use(express.json());
// extra packages
app.set('trust proxy', 1);
app.use(
	rateLimit({
		windowMs: 10 * 60 * 1000, // 10 minutes
		max: 100,
	})
);
app.use(helmet());
app.use(xss());
app.use(cors());



// routes
app.use('/api/v1/jobs',authenticate,jobs);
app.use('/api/v1/auth', auth);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB()
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
