const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
 
  let customError = {
    statusCode: err && err.statusCode ? err.statusCode : 500,
    message: err && err.message ? err.message : 'Something went wrong',
  }

  if (err.name === 'ValidationError') {
    customError = {
      statusCode: StatusCodes.BAD_REQUEST,
      message: Object.values(err.errors).map((val) => val.message),
    }
  }

  if (err.name === 'CastError') {
    customError = {
      statusCode: StatusCodes.BAD_REQUEST,
      message: `Resource not found. Invalid: ${err.path}`,
    }
}


  if(err.code === 11000) {
    customError = {
      statusCode: StatusCodes.BAD_REQUEST,
      message: `Duplicate field value entered`,
    }
  }

if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }


  res.status(customError.statusCode).json({
    success: false,
    error: customError.message,
  })
}

module.exports = errorHandlerMiddleware
