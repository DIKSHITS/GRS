const express = require("express")
const session = require("express-session"); // Import express-session
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const mongoose = require('mongoose');


// Initialize express-session
app.use(
  session({
    secret: "your-secret-key", // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }, // Session duration (1 hour in milliseconds)
  })
);

app.get('/users', async (req, res) => {
  try {
    const collections = await collection.find();
    res.json(collections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get("/",cors(),(req,res)=>{

})


app.post("/login",async(req,res)=>{
  const{email,password}=req.body

  try{
      const check=await collection.findOne({email:email, password:password,__v:1})

      if(check){
        req.session.user = { email };
          res.json("exist")
      }
      else{
          res.json("notexist")
      }
  }
  catch(e){
      res.json("fail")
  }

})

app.post("/signup",async(req,res)=>{
    const{email,password,firstName, lastName,contact,gender,userType,collegeId}=req.body

    const data={
      firstName:firstName,
      lastName: lastName,
      contact: contact,
      gender: gender,
      userType: userType,
      email: email,
      password:password,
      collegeId:collegeId,

    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

// Define a MongoDB schema and model for your complaint data
const complaintSchema = new mongoose.Schema({
  description: String,
  name: String, // You can store the file path or use GridFS for file storage
  collegeId: Number,
  date: String,
  priority: String,
  complaintType :String,
  department: String,
  person: String,
  poc: String,         // Added poc field
  pocContact: String,  // Added pocContact field
  Status:Number,
});

const Complaint = mongoose.model('Complaint', complaintSchema);

app.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/submit-complaint', async (req, res) => {
  try {
    const {
     description,
      name,
      collegeId,
      date,
      priority,
      complaintType,
      department,
      person,
      poc,
      pocContact,
   
    } = req.body;

    const newComplaint = new Complaint({
       description,
       complaintType,
       name,
       collegeId,
       date,
       priority,
       department,
       person,
       poc,
      pocContact,
    });
  
    await newComplaint.save();

    res.status(201).json({ message: 'Complaint saved successfully' });
  } catch (err) {
    console.error('Error saving complaint:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Update user status
app.post('/updateUserStatus', async (req, res) => {
  try {
    const userId = req.body._id; // Assuming you send the user ID in the request body
   console.log(userId);
    await collection.updateOne({ _id: userId }, { $set: { __v: 1 } });

    res.json({ success: true, message: 'User status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating user status' });
  }
});

app.post('/updateComplaintStatus', async (req, res) => {
  const userId = req.body._id; 
  try {
    // Update the status for the given complaint ID
    await  Complaint.updateOne({ _id: userId }, { $set: { __v: 1 } });
    res.status(200).send('Complaint updated successfully');
  } catch (error) {
    console.error('Error updating complaint:', error);
    res.status(500).send('Internal server error');
  }
});

// Create a route to handle Complaint deletion
app.delete('/RejectComplaint/:id', async (req, res) => {
  const _id = req.params.id; // Use req.params.id to access the user ID

  try {
    // Delete the Complaint by their MongoDB _id
    await Complaint.findByIdAndRemove(_id);

    console.log('Complaint deleted');
    res.status(204).end(); // 204 No Content indicates a successful deletion
  } catch (error) {
    console.error('Error deleting Complaint: ' + error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




const departmentSchema = new mongoose.Schema({
  depName: String,
  poc: String,
  pocContact: String,
  pocEmail: String,
});

const Department = mongoose.model('Department', departmentSchema);

// API Routes
app.get('/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/departments', async (req, res) => {
  try {
    const newDepartment = new Department(req.body);
    await newDepartment.save();
    res.json(newDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Middleware to enable CORS (for development purposes)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Create a route to handle user deletion
app.delete('/delete-user/:id', async (req, res) => {
  const _id = req.params.id; // Use req.params.id to access the user ID

  try {
    // Delete the user by their MongoDB _id
    await collection.findByIdAndRemove(_id);

    console.log('User deleted');
    res.status(204).end(); // 204 No Content indicates a successful deletion
  } catch (error) {
    console.error('Error deleting user: ' + error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/Profile', async (req, res) => {
  const { email } = req.query; // Assuming you're sending email as a query parameter

  try {
    const collections = await collection.find({ email });
    res.json(collections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/get-departments', async (req, res) => {
  const { } = req.query; // Assuming you're sending email as a query parameter

  try {
    const collections = await Department.find({});
   
    res.json(collections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/get-persons', async (req, res) => {
  const { } = req.query; // Assuming you're sending email as a query parameter

  try {
    const collections = await collection.find({});
    res.json(collections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


app.get('/api/userType', async (req, res) => {
  const userEmail = req.query.email;

  try {
    // Use await with find() to get a Query object
    const user = await collection.findOne({ email: userEmail });

    if (user) {
      // User found, respond with user type
      res.json({ userType: user.userType });
    } else {
      // User not found, respond with 404 status and error message
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/complaints_dik', async (req, res) => {
  try {
    // Replace 'your-email' with the actual email field in your schema
    const email = req.query.email ;
    const complaints = await Complaint.find({ person: email ,__v:1} );
    res.json(complaints);
  
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Assuming you have a route for resolving complaints, update your server code
app.put('/resolve_complaint/:id', async (req, res) => {
  try {
    const complaintId = req.params.id;
    
    // Update the status or any other field to mark the complaint as resolved
    await Complaint.updateOne({ _id: complaintId }, { $set: { __v: 2 } });

    res.json({ message: 'Complaint resolved successfully' });
  } catch (error) {
    console.error('Error resolving complaint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






app.get('/dashboard-data', async (req, res) => {
  try {
    // Fetch all users from the collection
    const users = await collection.find();
    const user = await Complaint.find();
    const use = await Department.find();
    // Count the number of users
    const userCount = users.length;
    const uniqueVisitors = user.length;
    const bounceRate = use.length;
    // Send the user count along with the user data in the response
    res.json({ userCount, users,uniqueVisitors, user , bounceRate,use});
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
app.listen(8000,()=>{
    console.log("port connected");
})

