import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.static('../client'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const modules = [
    { code: 'M30237', name: 'Web Programming', level: 5, description: "Introduction to web programming concepts.", notes: { "title": "Lecture Notes for Web Programming", "content": "Web programming notes." }, credits: 20 },
    { code: 'M21270', name: 'Data Structures & Algorithms', level: 5, description: "Introduction to data structures and algorithms concepts.", notes: { "title": "Lecture Notes for Data Structures & Algorithms", "content": "Data structures and algorithms notes." }, credits: 20 },
    { code: 'M31280', name: 'Database Systems', level: 4, description: "Introduction to database systems concepts.", notes: { "title": "Lecture Notes for Database Systems", "content": "Database systems notes." }, credits: 20 },
    { code: 'M41390', name: 'Operating Systems', level: 5, description: "Introduction to operating systems concepts.", notes: { "title": "Lecture Notes for Operating Systems", "content": "Operating systems notes." }, credits: 20 },
    { code: 'M51400', name: 'Software Engineering', level: 5, description: "Introduction to software engineering concepts.", notes: { "title": "Lecture Notes for Software Engineering", "content": "Software engineering notes." }, credits: 20 },
    { code: 'M61500', name: 'Artificial Intelligence', level: 6, description: "Introduction to artificial intelligence concepts.", notes: { "title": "Lecture Notes for Artificial Intelligence", "content": "Artificial intelligence notes." }, credits: 20 }
]

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

app.get('/api/courses', (req, res) => {
    // Return sample course data
    res.json(modules);
});

app.get('/notes/:code', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/pages/notes.html"));
});


app.get('/api/notes/:code', (req, res) => {
    const moduleCode = req.params.code;
    const module = modules.find(m => m.code === (moduleCode));
    if (!module) {
        return res.status(404).json({ error: 'Module not found' });
    }
    res.json({
        title: module.notes.title,
        moduleCode: module.code,
        content: module.notes.content
    });
});

app.get('/api/assignments/:code', (req, res) => {
    const moduleCode = req.params.code;
    const module = modules.find(m => m.code === (moduleCode));
    if (!module) {
        return res.status(404).json({ error: 'Module not found' });
    }
    res.json({
        title: `Assignments for Module ${moduleCode}`,

        content: 'Here you can find the assignments for this module.'
    });
});

app.get('/api/resources/:code', (req, res) => {
    const moduleCode = req.params.code;
    const module = modules.find(m => m.code === (moduleCode));
    if (!module) {
        return res.status(404).json({ error: 'Module not found' });
    }
    res.json({
        title: `Resources for Module ${moduleCode}`,
        content: 'Here you can find additional resources for this module.'
    });
});


app.listen(8080);
console.log('Server is running on http://localhost:8080');

