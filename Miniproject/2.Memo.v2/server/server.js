const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();
const port = 3000;

app.use(express.json());


app.get("/", (req,res) => {

})

app.post("/post", (req,res) => {
    
})


app.delete("/delete", (req, res) => {
    const filename = req.body.filename;
    const filePath = path.join(__dirname, "uploads", filename);
  
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: "파일 삭제 완료" });
    } else {
      res.status(404).json({ message: "파일 없음" });
    }
  });

app.patch("/post", (req,res) => {

})
  
app.listen(port, () => {
    console.log(`서버 레디 on ${port}`);
});
