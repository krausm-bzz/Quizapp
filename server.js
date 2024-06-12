const express = require("express");
const app = express();
const {connect} = require("mongoose");


const cors = require("cors")

app.use(cors({
    origin: "http://localhost:63342",
}));

app.use(express.json())


connect("mongodb://127.0.0.1:27017/quizDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => console.log(err));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});