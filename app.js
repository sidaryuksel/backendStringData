const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const words = {};

//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text({type: "*/*"}));

app.post('/input', (req, res) => {
    try {
        const word = req.body;
        console.log("heyo: ", req.body);

        if (words[word]) {
            words[word]++;
        } else {
            words[word] = 1;
        }

    } catch (err) {
        res.send({ message: err });
    };
})

app.get('/query/key=:word', (req, res) => {
    try {
        const word = req.params.word;
        if (!words[word]) 
            words[word] = 0;
        console.log(words[word]);
        const count = words[word];
        res.send(count);
    }catch (err) {
        res.send("There is an error");
    }
})


app.listen(9000, () =>
    console.log("Server started at http://localhost:9000 ")
)
