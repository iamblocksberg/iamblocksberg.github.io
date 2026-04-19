const express = require("express");
const { exec } = require("child_process");
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// Route to put PC to sleep
app.get("/sleep", (req, res) => {
  // Command to put the PC to sleep
  const sleepCommand = "rundll32.exe powrprof.dll,SetSuspendState 0,1,0";

  exec(sleepCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing sleep command: ${error.message}`);
      return res.send("Failed to execute sleep command");
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.send("Error occurred while sleeping");
    }

    console.log("PC is going to sleep...");
    res.send("PC is now sleeping");
  });
});

// Start the web server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
