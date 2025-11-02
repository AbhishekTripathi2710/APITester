
import { useState } from 'react';
import './App.css'
import ApiTester from './components/ApiTester'
import WebSocketTester from './components/WebSocketTester';
import Tabs from './components/Tabs';

function App() {

  const [activeTab,setActiveTab] = useState("REST");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      <div className="border-b border-gray-800 backdrop-blur-sm bg-gray-900/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  API Tester
                </h1>
                <p className="text-xs text-gray-400">API & WebSocket Testing Tool</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6">
          {activeTab === "REST" && <ApiTester />}
          {activeTab === "WebSocket" && <WebSocketTester />}
        </div>
      </div>
    </div>
  );
}

export default App
