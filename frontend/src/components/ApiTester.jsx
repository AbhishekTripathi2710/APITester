import React, { useState } from "react";
import axios from "axios";
import ResponseViewer from "./ResponseViewer";

const ApiTester = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("{}");
  const [body, setBody] = useState("{}");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getMethodColor = (method) => {
    const colors = {
      GET: "bg-green-500",
      POST: "bg-blue-500",
      PUT: "bg-yellow-500",
      PATCH: "bg-purple-500",
      DELETE: "bg-red-500",
    };
    return colors[method] || "bg-gray-500";
  };

  const handleSend = async () => {
    setError("");
    setLoading(true);
    setResponse(null);

    try {
      const res = await axios.post("http://localhost:5000/api/test", {
        url,
        method,
        headers: JSON.parse(headers || "{}"),
        body: JSON.parse(body || "{}"),
      });

      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-white">Make Request</h2>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="relative">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg font-semibold appearance-none cursor-pointer hover:bg-gray-600 transition-colors pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/endpoint"
            className="flex-1 bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <button
            onClick={handleSend}
            disabled={loading || !url}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/20 flex items-center gap-2 min-w-[120px] justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>Send</span>
              </>
            )}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Headers (JSON)
          </label>
          <textarea
            rows="3"
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            className="w-full bg-gray-900 border border-gray-600 text-white p-3 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder='{"Content-Type": "application/json"}'
          />
        </div>

        {["POST", "PUT", "PATCH"].includes(method) && (
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Body (JSON)
            </label>
            <textarea
              rows="8"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 text-white p-3 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder='{"key": "value"}'
            />
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {response && <ResponseViewer response={response} />}
    </div>
  );
};

export default ApiTester;
