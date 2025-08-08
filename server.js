// auto-reg-server

require("dotenv").config();
const express = require("express");
const syncAutoRegMock = require("./autoregSyncMock");
const syncAutoRegReal = require("./autoregSyncReal");

const app = express();
const PORT = process.env.PORT || 3000;

// Mock data route
app.get("/test-mock-sync", async (req, res) => {
  try {
    const result = await syncAutoRegMock();
    res.json(result);
  } catch (error) {
    console.error("Mock Sync Error:", error.message);
    res.status(500).json({ error: "Mock sync failed" });
  }
});

// Real AutoReg data route
app.get("/sync-autoreg/:start/:end", async (req, res) => {
  try {
    const { start, end } = req.params;
    const result = await syncAutoRegReal(start, end);
    res.json(result);
  } catch (error) {
    console.error("Real Sync Error:", error.message);
    res.status(500).json({ error: "Real sync failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
