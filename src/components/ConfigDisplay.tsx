import { CheckCircle, XCircle, Settings, Clock, Globe } from 'lucide-react';
import { AppConfig } from '../config';

interface ConfigDisplayProps {
  config: AppConfig;
}

export const ConfigDisplay = ({ config }: ConfigDisplayProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-800">Runtime Configuration Status</h2>
        <CheckCircle className="h-5 w-5 text-green-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Globe className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">Application Name</label>
              <p className="text-gray-900 font-semibold">{config.appName}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className={`w-5 h-5 rounded-full mt-0.5 ${
              config.environment === 'production' ? 'bg-green-500' : 
              config.environment === 'development' ? 'bg-yellow-500' : 'bg-blue-500'
            }`}></div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">Environment</label>
              <p className="text-gray-900 font-semibold capitalize">{config.environment}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-purple-500 mt-0.5" />
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">Build Time</label>
              <p className="text-gray-900 text-sm font-mono">
                {new Date(config.buildTime).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">API Endpoint</label>
            <div className="bg-gray-50 p-3 rounded-md">
              <code className="text-sm text-gray-800 break-all">{config.apiUrl}</code>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">Feature Flags</label>
            <div className="space-y-2">
              {Object.entries(config.features).map(([feature, enabled]) => (
                <div key={feature} className="flex items-center justify-between">
                  <span className="text-sm capitalize">
                    {feature.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <div className="flex items-center space-x-2">
                    {enabled ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      enabled 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {enabled ? 'ON' : 'OFF'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-200">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <p className="text-sm text-green-800 font-medium">
            Configuration loaded successfully from runtime-config.json
          </p>
        </div>
        <p className="text-xs text-green-700 mt-1">
          Version: {config.version} • Environment: {config.environment}
        </p>
      </div>
    </div>
  );
};