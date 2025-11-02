import JsonView from "@uiw/react-json-view";
import { darkTheme } from "@uiw/react-json-view/dark";

const ResponseViewer = ({ response }) => {
  if (!response) {
    return null;
  }

  const safeValue = (val) => {
    if (val && typeof val === "object") return val;
    try {
      return JSON.parse(val);
    } catch {
      return { data: val ?? "No data" };
    }
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return "bg-green-500";
    if (status >= 300 && status < 400) return "bg-yellow-500";
    if (status >= 400 && status < 500) return "bg-orange-500";
    if (status >= 500) return "bg-red-500";
    return "bg-gray-500";
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Response</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(response.status)}`}></div>
            <span className="text-sm font-semibold">
              Status: {response.status} {response.statusText}
            </span>
          </div>
          <div className="text-sm text-gray-400 font-mono">
            ⏱️ {response.responseTime}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <details open className="group">
          <summary className="cursor-pointer font-semibold text-gray-300 mb-2 flex items-center gap-2 list-none">
            <svg className="w-5 h-5 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>Headers</span>
          </summary>
          <div className="ml-7 bg-gray-900/50 rounded-lg p-4 border border-gray-700 overflow-x-auto">
            <JsonView
              value={safeValue(response.headers)}
              style={darkTheme}
              collapsed={false}
            />
          </div>
        </details>

        <details open className="group">
          <summary className="cursor-pointer font-semibold text-gray-300 mb-2 flex items-center gap-2 list-none">
            <svg className="w-5 h-5 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>Body</span>
          </summary>
          <div className="ml-7 bg-gray-900/50 rounded-lg p-4 border border-gray-700 overflow-x-auto">
            <JsonView
              value={safeValue(response.data)}
              style={darkTheme}
              collapsed={false}
            />
          </div>
        </details>
      </div>
    </div>
  );
};

export default ResponseViewer;
