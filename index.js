import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res)=>{
    res.render("index.ejs");
})

app.get("/randomManga", async (req, res)=>{
    try {
        const response = await axios.get("https://api.jikan.moe/v4/random/manga");
        const result = response.data["data"];
        res.render("mangaInfo.ejs", { data: result });
        } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
})

app.post("/searchManga", async (req, res)=>{
    console.log(req.body["mangaTitle"]);
    try {
        const response = await axios.get("https://api.jikan.moe/v4/manga", {
            letter: req.body["mangaTitle"]
        });
        const result = response.data;
        const newResult = result["data"];
        res.render("mangaSearch.ejs", { data: newResult });
        } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
})

app.listen(port, ()=>{
    console.log(`App running on ${port}`);
})