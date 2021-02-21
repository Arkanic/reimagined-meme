import express from "express";

const app:express.Application = express();
app.use(express.static("dist"));
app.listen(process.env.port || 8080, () => {
    console.log("Server started");
});