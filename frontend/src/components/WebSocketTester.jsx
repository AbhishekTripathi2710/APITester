import React, { useState, useEffect, useRef } from "react";

const WebSocketTester = () => {
  const [url, setUrl] = useState("wss://echo.websocket.org"); 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectWebSocket = () => {
    if (!url.startsWith("ws")) {
      alert("Please enter a valid WebSocket URL (ws:// or wss://)");
      return;
    }

    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      setIsConnected(true);
      setMessages((prev) => [...prev, { type: "system", text: "Connected to WebSocket server" }]);
    };

    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, { type: "received", text: event.data }]);
    };

    socketRef.current.onclose = () => {
      setIsConnected(false);
      setMessages((prev) => [...prev, { type: "system", text: "❌ Disconnected from server" }]);
    };

    socketRef.current.onerror = (error) => {
      setMessages((prev) => [...prev, { type: "error", text: "Error: Connection failed" }]);
    };
  };

  const disconnectWebSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    if (socketRef.current && isConnected) {
      socketRef.current.send(input);
      setMessages((prev) => [...prev, { type: "sent", text: input }]);
      setInput("");
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  const getMessageStyle = (type) => {
    const styles = {
      sent: "bg-blue-500/20 border-blue-500/50 text-blue-300",
      received: "bg-green-500/20 border-green-500/50 text-green-300",
      system: "bg-yellow-500/20 border-yellow-500/50 text-yellow-300",
      error: "bg-red-500/20 border-red-500/50 text-red-300",
    };
    return styles[type] || "bg-gray-700/20 border-gray-600/50";
  };

  const getMessageIcon = (type) => {
    if (type === "sent") return "📤";
    if (type === "received") return "📥";
    return "";
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">WebSocket Connection</h2>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}></div>
            <span className="text-sm font-medium text-gray-300">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            className="flex-1 bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="wss://echo.websocket.org"
            disabled={isConnected}
          />
          {!isConnected ? (
            <button 
              onClick={connectWebSocket}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-200 shadow-lg shadow-green-500/20 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              <span>Connect</span>
            </button>
          ) : (
            <button 
              onClick={disconnectWebSocket}
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all duration-200 shadow-lg shadow-red-500/20 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Disconnect</span>
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            className="flex-1 bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={!isConnected}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isConnected || !input.trim()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Send</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Messages</h3>
          <button
            onClick={clearMessages}
            className="text-sm text-gray-400 hover:text-white px-3 py-1 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            Clear All
          </button>
        </div>
        
        <div className="bg-gray-900/50 rounded-lg p-4 h-96 overflow-y-auto border border-gray-700 font-mono text-sm">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p>No messages yet...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`border-l-4 rounded-r-lg p-3 ${getMessageStyle(msg.type)}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-base">{getMessageIcon(msg.type)}</span>
                    <div className="flex-1 break-words">
                      <div className="font-semibold mb-1 capitalize text-xs tracking-wide opacity-75">
                        {msg.type}
                      </div>
                      <div>{msg.text}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebSocketTester;
