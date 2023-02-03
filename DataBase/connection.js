import mysql2 from "mysql2"


const connection = mysql2.createConnection({
    host: "localhost",
    database: "ecommerce",
    user: "root",
    password: "",
  });

  export default connection