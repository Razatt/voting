const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

// Save Wallet Info
app.post("/save-wallet", (req, res) => {
    const data = req.body;
    saveToFile("wallet.json", data, res);
});

// Save Bank Info
app.post("/save-bank", (req, res) => {
    const data = req.body;
    saveToFile("bank.json", data, res);
});

function saveToFile(filePath, data, res) {
    fs.readFile(filePath, "utf8", (err, fileData) => {
        const items = err ? [] : JSON.parse(fileData || "[]");
        items.push(data);

        fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error saving data.");
            }
            res.status(200).send("Data saved successfully.");
        });
    });
}

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
