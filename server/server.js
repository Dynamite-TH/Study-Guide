import express from "express";

const app = express();

app.use(express.static('../client'));


app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

app.get('/api/courses', (req, res) => {
    // Return sample course data
    res.json([
        { id: 1, name: 'Web Programming', level: 5 },
        { id: 2, name: 'Data Structures & Algorithms', level: 5 },
        { id: 3, name: 'Database Systems', level: 4 },
        { id: 4, name: 'Operating Systems', level: 5 },
        { id: 5, name: 'Software Engineering', level: 5 },
        { id: 6, name: 'Artificial Intelligence', level: 6 }
    ]);
});

app.get('/notes-:id', (req, res) => {
    const moduleId = req.params.id;
    res.send(`<h1>Lecture Notes for Module ${moduleId}</h1><p>Here you can find the lecture notes for this module.</p>`);
});

app.get('/assignments-:id', (req, res) => {
    const moduleId = req.params.id;
    res.send(`<h1>Assignments for Module ${moduleId}</h1><p>Here you can find the assignments for this module.</p>`);
});

app.get('/resources-:id', (req, res) => {
    const moduleId = req.params.id;
    res.send(`<h1>Resources for Module ${moduleId}</h1><p>Here you can find additional resources for this module.</p>`);
});


app.listen(8080, () => {
    console.log(`Server is running on port 8080`);
});

