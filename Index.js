const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

function showQuestion() {
    const questions = [
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" },
        { question: "What is the chemical symbol for gold?", answer: "Au" },
        { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
        { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
        { question: "What is the smallest prime number?", answer: "2" },
        { question: "In what year did the Titanic sink?", answer: "1912" },
        { question: "What is the longest river in the world?", answer: "Nile" },
        { question: "Who discovered penicillin?", answer: "Alexander Fleming" },
        { question: "What is the capital of Japan?", answer: "Tokyo" },
        { question: "Who is known as the father of computers?", answer: "Charles Babbage" },
        { question: "What is the speed of light in vacuum (m/s)?", answer: "299792458" },
        { question: "Who developed the theory of relativity?", answer: "Albert Einstein" },
        { question: "What is the main ingredient in guacamole?", answer: "Avocado" },
        { question: "In which city is the Statue of Liberty located?", answer: "New York" },
        { question: "What is the capital of Australia?", answer: "Canberra" },
        { question: "Who wrote the play 'Romeo and Juliet'?", answer: "William Shakespeare" },
        { question: "What is the largest mammal in the world?", answer: "Blue Whale" },
        { question: "Who was the first person to walk on the moon?", answer: "Neil Armstrong" },
        { question: "What is the hardest natural substance on Earth?", answer: "Diamond" },
        { question: "In which year did World War II end?", answer: "1945" },
        { question: "What is the primary gas found in the Earth's atmosphere?", answer: "Nitrogen" },
        { question: "Who wrote the novel '1984'?", answer: "George Orwell" },
        { question: "What is the capital of Canada?", answer: "Ottawa" },
        { question: "Which planet is known as the Red Planet?", answer: "Mars" },
        { question: "What is the largest ocean on Earth?", answer: "Pacific Ocean" },
        { question: "Who invented the telephone?", answer: "Alexander Graham Bell" },
        { question: "What is the smallest country in the world?", answer: "Vatican City" },
        { question: "Who composed the Four Seasons?", answer: "Antonio Vivaldi" },
        { question: "What is the tallest mountain in the world?", answer: "Mount Everest" }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
}

app.get('/', (req, res) => {
    if (!req.session.question) {
        req.session.question = showQuestion();
    }

    const questionObj = req.session.question;
    const question = questionObj.question;

    if (req.session.answeredCorrectly) {
        req.session.answeredCorrectly = false;
        req.session.question = showQuestion();
        res.redirect('/');
        return;
    }

    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading HTML file');
            return;
        }

        const modifiedData = data.replace('<p id="question"></p>', `<p id="question">${question}</p>`);
        res.send(modifiedData);
    });
});

app.post('/submit-answer', (req, res) => {
    if (!req.session || !req.session.question) {
        res.redirect('/');
        return;
    }

    const userAnswer = req.body.answer;
    const correctAnswer = req.session.question.answer;

    if (userAnswer && userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        req.session.answeredCorrectly = true;
    }
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
