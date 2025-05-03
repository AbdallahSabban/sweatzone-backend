const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample GET endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'SweatZoner' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



//features to start working on dasda
//fixing up the create a tournament screen
//  make the date a selection instead of text
//  the location be a real location from a list
//

//creating tournaments
//saves them in json file
//adding participants
// adds particpants and generates matches and saves them to json
//when tournaments details is opened in app it fetches matches
// create a matches tab to display matches