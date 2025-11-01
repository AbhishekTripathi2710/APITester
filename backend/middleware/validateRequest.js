const VALID_HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const VALID_WS_ACTIONS = ["connect", "send", "close"];

const validateRequest = (req, res, next) => {
  const { url, method, headers, body, params, action, message } = req.body;

  if (!url) return res.status(400).json({ error: "URL is required" });
  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  const isWebSocket = url.startsWith("ws://") || url.startsWith("wss://");

  if (isWebSocket) {
    if (!action || !VALID_WS_ACTIONS.includes(action)) {
      return res.status(400).json({
        error: `Invalid WebSocket action. Must be one of: ${VALID_WS_ACTIONS.join(", ")}`,
      });
    }

    if (action === "send" && (message === undefined || message === null)) {
      return res.status(400).json({ error: "Message is required for WebSocket 'send' action" });
    }

    return next();
  }

  if (!method) return res.status(400).json({ error: "HTTP method is required" });

  if (!VALID_HTTP_METHODS.includes(method.toUpperCase())) {
    return res.status(400).json({
      error: `Invalid HTTP method. Allowed: ${VALID_HTTP_METHODS.join(", ")}`,
    });
  }

  if (headers && typeof headers !== "object") {
    return res.status(400).json({ error: "Headers must be an object" });
  }

  if (params && typeof params !== "object") {
    return res.status(400).json({ error: "Params must be an object" });
  }

  if (body && typeof body !== "object") {
    return res.status(400).json({ error: "Body must be an object" });
  }

  next(); 
};

module.exports = validateRequest;
