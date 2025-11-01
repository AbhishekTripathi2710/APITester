const express = require("express");
const WebSocket = require("ws");
const validateRequest = require("../middleware/validateRequest");
const router = express.Router();

const wsConnections = new Map();

router.post("/ws/connect",validateRequest, async (req, res) => {
  const { action, url, message } = req.body;

  try {
    if (action === "connect") {
      if (!url) return res.status(400).json({ error: "WebSocket URL required" });

      if (wsConnections.has(url)) {
        return res.json({ success: true, message: `Already connected to ${url}` });
      }

      const ws = new WebSocket(url);

      ws.on("open", () => {
        console.log(`Connected to ${url}`);
      });

      ws.on("message", (data) => {
        console.log(`Message from ${url}: ${data}`);
      });

      ws.on("error", (err) => {
        console.error(`WebSocket error for ${url}: ${err.message}`);
      });

      ws.on("close", () => {
        console.log(`Disconnected from ${url}`);
        wsConnections.delete(url);
      });

      wsConnections.set(url, ws);
      return res.json({ success: true, message: `Connecting to ${url}...` });
    }

    if (action === "send") {
      if (!url || !message)
        return res.status(400).json({ error: "URL and Message are required" });

      const ws = wsConnections.get(url);
      if (!ws || ws.readyState !== WebSocket.OPEN)
        return res.status(400).json({ error: "WebSocket not connected" });

      ws.send(message);
      return res.json({ success: true, message: `Message sent to ${url}` });
    }

    if (action === "close") {
      if (!url) return res.status(400).json({ error: "URL required" });

      const ws = wsConnections.get(url);
      if (ws) {
        ws.close();
        wsConnections.delete(url);
        return res.json({ success: true, message: `Connection closed for ${url}` });
      } else {
        return res.status(400).json({ error: "No active connection for this URL" });
      }
    }

    return res.status(400).json({ error: "Invalid action" });
  } catch (error) {
    console.error("WebSocket route error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
