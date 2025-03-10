const express = require('express');
const app = express();
require("dotenv").config();
console.log("MongoDB URI:", process.env.MONGO_URL);
app.use(express.json());
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;

const userRoute = require('./routes/usersRoute');
const projectsRoute = require('./routes/projectsRoute');


app.use('/api/users',userRoute);
app.use('/api/projects',projectsRoute);

app.listen(port,()=> console.log(`Node JS server listening on port ${port}`));

