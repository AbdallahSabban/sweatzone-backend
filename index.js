const express = require('express');
const app = express();
const port = 3000;

// Empty array of events to display on home page
let events = [];

// Middleware to parse JSON requests
app.use(express.json());

// Sample GET endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'SweatZone' });
});



// GET endpoint to fetch all events
app.get('/api/events', (req, res) => {
    res.status(200).json({
        message: 'Events fetched successfully',
        events: events,
    });
});

// GET endpoint to fetch a specific event by ID
app.get('/api/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const event = events.find((e) => e.id === eventId);

    if (!event) {
        return res.status(404).json({
            message: 'Event not found',
        });
    }

    res.status(200).json({
        message: 'Event fetched successfully',
        event: event,
    });
});


// POST endpoint to handle event creation

// Function to generate a single-elimination bracket
function generateSingleEliminationBracket(participants) {
    const matches = [];
    let numParticipants = participants.length;

    // Ensure we have at least 2 participants
    if (numParticipants < 2) {
        return matches; // Return empty if not enough participants
    }

    // Calculate the number of byes (to make the bracket a power of 2)
    let powerOfTwo = 1;
    while (powerOfTwo < numParticipants) {
        powerOfTwo *= 2;
    }
    const byes = powerOfTwo - numParticipants;

    // Create first-round matches using index-based seeding
    let matchId = 1;
    const totalSlots = numParticipants + byes;
    const firstRoundMatches = Math.floor(totalSlots / 2);

    for (let i = 0; i < firstRoundMatches; i++) {
        const match = {
            id: matchId++,
            round: 1,
            player1: null,
            player2: null,
            winner: null,
        };

        // Assign players based on seeding
        const topSeedIndex = i;
        const bottomSeedIndex = totalSlots - 1 - i;

        // Assign player1 (top seed)
        if (topSeedIndex < numParticipants) {
            match.player1 = participants[topSeedIndex];
        }

        // Assign player2 (bottom seed)
        if (bottomSeedIndex < numParticipants) {
            match.player2 = participants[bottomSeedIndex];
        }

        matches.push(match);
    }

    // Generate subsequent rounds
    let currentRound = 1;
    let matchesInCurrentRound = matches.filter((m) => m.round === currentRound).length;

    while (matchesInCurrentRound > 1) {
        currentRound++;
        const previousRoundMatches = matches.filter((m) => m.round === currentRound - 1);
        for (let i = 0; i < previousRoundMatches.length; i += 2) {
            matches.push({
                id: matchId++,
                round: currentRound,
                player1: null, // Will be filled when previous round winners are determined
                player2: null,
                winner: null,
            });
        }
        matchesInCurrentRound = matches.filter((m) => m.round === currentRound).length;
    }

    return matches;
}

// POST endpoint to handle event creation
app.post('/api/events', (req, res) => {
    const { title, date, location, description, participants } = req.body;

    // Basic validation
    if (!title || !date || !location || !description || !participants) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate participants (at least 2)
    if (!Array.isArray(participants) || participants.length < 2) {
        return res.status(400).json({ message: 'At least two participants are required.' });
    }

    // Generate single-elimination bracket
    const matches = generateSingleEliminationBracket(participants);

    // Simulate saving the event (e.g., to a database)
    const newEvent = {
        id: Date.now(), // Mock event ID based on current timestamp
        title,
        date,
        location,
        description,
        participants, // Store the participants array
        matches, // Store the generated matches
    };

    events.push(newEvent);

    console.log('New event added:', newEvent);
    console.log('Events array:', events);

    // Respond with the created event
    return res.status(201).json({
        message: 'Event created successfully',
        event: newEvent,
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});