const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");


const app = express();



app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    
    
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
        
    })
})

app.post('/create', (req, res) => {
    const sql  = "INSERT INTO student (`Name`, `Email`) VALUES (?,?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE student SET `Name` = ?, `Email` = ? WHERE ID = ?";
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;


  db.query(sql, [name, email, id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

app.put("/delete/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error deleting record:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.affectedRows === 0) {
      // No rows were deleted, indicating that the record with the given ID was not found.
      return res.status(404).json({ error: "Record not found" });
    }

    // Record deleted successfully
    return res.json({ success: true });
  });
});




app.listen(8081, () => {
    console.log("listening to port 8081");
})