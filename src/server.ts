import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.status(200).json("hello world")

})

app.listen(3000, () => {
    console.log("server is running on: http://localhost:3000")
})