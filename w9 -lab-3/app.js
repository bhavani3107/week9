const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");
const logger = require("./middlewares/logger")

const blogAPI = require("./controllers/ContactAPIController");
const blogSSR = require("./controllers/ContactSSRController");
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.use(logger) 

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();
 
// SSR

// End1: Route to render index.html with Contacts using EJS
app.get("/", blogSSR.renderContacts);
// End2: Define a route to render the addContact.ejs view
app.get("/addContact", blogSSR.renderForm);
// End3:Route to add  Contact using EJ
app.post("/addContact", blogSSR.addContact);
// Define a route to render the singleContact.ejs view
app.get("/single-Contact/:id", blogSSR.renderContact);
// Define a route to delete singleContact
app.delete("/single-Contact/:id", blogSSR.deleteContact);
// Define a route to update single Contact.ejs
app.put("/single-Contact/:id", blogSSR.updateContact);
// Define Contact to update
app.get("/single-Contact/update/:id", blogSSR.renderUpdateContact);

// API
// GET all Contacts
app.get("/api/Contacts", blogAPI.getContacts);
// POST a new Contact
app.post("/api/Contacts", blogAPI.addContact);
// GET a single Contact
app.get("/api/Contacts/:id", blogAPI.getContact);

// Update Contact using PUT
app.put("/api/Contacts/:id", blogAPI.updateContact);
// DELETE a Contact
app.delete("/api/Contacts/:id", blogAPI.deleteContact);
// DELETE all Contact
app.delete("/api/Contacts", blogAPI.deleteAllContacts);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});