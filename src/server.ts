import express, { Application } from "express";
import 'dotenv/config'
import { createRole, deleteRole, getRoles, updateRole } from "./controllers/roleController";
import { AppDataSource } from "./database/db";
import { register } from "./controllers/authController";
import { getUserById, getUsers, updateUserById } from "./controllers/userController";


const app: Application = express();

app.use(express.json());

const PORT = process.env.PORT || 4001;

app.get('/healthy', (req, res) => {
  res.status(200).json(
    {
      success: true,
      message: "Server is healthy"
    }
  );
})

// roles routes
app.get('/roles', getRoles)
app.post('/roles', createRole)
app.put('/roles/:id', updateRole)
app.delete('/roles/:id', deleteRole)

// AUTH routes
app.post('/api/register', register)


// users routes 
app.get('/api/users', getUsers)
app.get('/api/users/:id', getUserById)
app.put('/api/users/:id', updateUserById)


  AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    })
  })
  .catch(error => {
    console.log(error);  
  })




