import React, { useEffect, useState } from 'react';
import { ConfigDisplay } from './components/ConfigDisplay';
import { ProfileForm } from './components/ProfileForm';
import { ProfileList } from './components/ProfileList';
import { loadConfig, AppConfig } from './config';
import { Heart, Activity, Users } from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  bloodGroup: string;
  insurance: string;
  email: string;
  idProof: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileFormData {
  name: string;
  bloodGroup: string;
  insurance: string;
  email: string;
  idProof: string;
}

function App() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [profilesLoading, setProfilesLoading] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const loadedConfig = await loadConfig();
        setConfig(loadedConfig);
        await fetchProfiles(loadedConfig.apiUrl);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const fetchProfiles = async (apiUrl: string) => {
    setProfilesLoading(true);
    try {
      const response = await fetch(`${apiUrl}/profile`);
      const result = await response.json();
      
      if (result.success) {
        setProfiles(result.data);
      } else {
        console.error('Failed to fetch profiles:', result.error);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setProfilesLoading(false);
    }
  };

  const handleCreateProfile = async (formData: ProfileFormData) => {
    if (!config) return;

    setFormLoading(true);
    try {
      const response = await fetch(`${config.apiUrl}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setProfiles(prev => [result.data, ...prev]);
        alert('Profile created successfully!');
      } else {
        alert(`Failed to create profile: ${result.error}`);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProfile = async (id: string) => {
    if (!config) return;
    
    if (!confirm('Are you sure you want to delete this profile?')) return;

    try {
      const response = await fetch(`${config.apiUrl}/profile/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setProfiles(prev => prev.filter(profile => profile.id !== id));
        alert('Profile deleted successfully!');
      } else {
        alert(`Failed to delete profile: ${result.error}`);
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Failed to delete profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Health App...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Failed to load application configuration</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <Heart className="h-12 w-12 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-900">{config.appName}</h1>
          </div>
          <p className="text-xl text-gray-600">
            Comprehensive Health Profile Management System
          </p>
          <div className="mt-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              config.environment === 'production' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {config.environment}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">{profiles.length}</h3>
            <p className="text-gray-600">Total Profiles</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Activity className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">Active</h3>
            <p className="text-gray-600">System Status</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">v{config.version}</h3>
            <p className="text-gray-600">App Version</p>
          </div>
        </div>

        {/* Configuration Display */}
        <ConfigDisplay config={config} />

        {/* Profile Form */}
        <div className="mb-8">
          <ProfileForm onSubmit={handleCreateProfile} loading={formLoading} />
        </div>

        {/* Profile List */}
        <ProfileList 
          profiles={profiles} 
          onDelete={handleDeleteProfile}
          loading={profilesLoading}
        />

        {/* API Information */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🔗 API Endpoints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span>
                <code className="text-gray-700">/api/profile</code>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">POST</span>
                <code className="text-gray-700">/api/profile</code>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span>
                <code className="text-gray-700">/api/profile/:id</code>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">DELETE</span>
                <code className="text-gray-700">/api/profile/:id</code>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">POST</span>
                <code className="text-gray-700">/api/upload</code>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span>
                <code className="text-gray-700">/api/health</code>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">
              <strong>Base URL:</strong> <code>{config.apiUrl}</code>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Built with React + TypeScript + Node.js + Express + Docker</p>
          <p className="text-sm mt-1">Build Time: {config.buildTime}</p>
        </div>
      </div>
    </div>
  );
}

export default App;