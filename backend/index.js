const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-email", async (req, res) => {
  try {
    const { emailType, userDetails, tone } = req.body;

    const prompt = `Generate a ${tone} email for ${emailType} with the following details: ${userDetails}`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    res.json({ email: response.data.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: "Error generating email",
      details: error.response ? error.response.data : error.message,
    });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
