const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const AppError = require("./utils/AppError");

const server = express();
const port = 3000;

server.use(express.json());
server.use(cors());
server.use(routes);

server.use((error, req ,res, next)=>{
  if(error instanceof AppError){
    return res.status(error.statusCode).json({
      status: 'Failed',
      message: error.message,
    });
  };
  return res.status(500).json({
    status: 'Failure',
    message: 'Internal server error.'
  });
});

server.listen(port, ()=> {
  console.log(`Server is running on port ${port}`);
})
