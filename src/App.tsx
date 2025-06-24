import React, { useEffect, useState } from 'react';
import { Heart, LogOut, User, Edit } from 'lucide-react';
import { AuthForm } from './components/AuthForm';
import { ProfileForm } from './components/ProfileForm';
import { authService, AuthUser } from './services/auth.service';

interface Profile {
  id: string;
  name: string;
  blood_group: string;
  insurance_provider: string;
  insurance_number: string;
  pdf_url?: string;
}

interface ProfileFormData {
  name: string;
  blood_group: string;
  insurance_provider: string;
  insurance_number: string;
  pdf_url?: string;
}

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const config = {
    appName: import.meta.env.VITE_APP_NAME || 'Health Dashboard',
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
  };

  useEffect(() => {
    // Clear any cached user data on app start
    authService.logout();
    setLoading(false);
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/profile`, {
        headers: authService.getAuthHeaders(),
      });
      const result = await response.json();
      
      if (result.success) {
        setProfile(result.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      fetchProfile();
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      authService.logout();
      setUser(null);
      setProfile(null);
      setEditing(false);
    }
  };

  const handleViewDocument = async () => {
    try {
      // Simple fallback - just open the direct URL
      if (profile?.pdf_url) {
        window.open(profile.pdf_url, '_blank');
        return;
      }
      
      alert('No document available');
    } catch (error) {
      console.error('Error viewing document:', error);
      alert('Failed to load document. Please try again.');
    }
  };

  const handleSaveProfile = async (formData: ProfileFormData) => {
    setFormLoading(true);
    try {
      const method = profile ? 'PUT' : 'POST';
      
      // Remove pdf_url if empty to avoid validation error
      const { pdf_url, ...profileData } = formData;
      const requestData = pdf_url ? formData : profileData;
      
      const response = await fetch(`${config.apiUrl}/profile`, {
        method,
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      
      if (result.success) {
        setProfile(result.data);
        setEditing(false);
        alert(`Profile ${profile ? 'updated' : 'created'} successfully!`);
      } else {
        alert(`Failed to save profile: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <Heart className="h-12 w-12 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-900">{config.appName}</h1>
            <button
              onClick={handleLogout}
              className="ml-4 flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
          <p className="text-lg text-gray-700">
            Welcome, {profile?.name || user.username}!
          </p>
        </div>

        {/* Profile Section */}
        {profile ? (
          !editing ? (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Your Health Profile</h2>
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900">{profile.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Blood Group</label>
                  <p className="text-gray-900">{profile.blood_group}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Insurance Provider</label>
                  <p className="text-gray-900">{profile.insurance_provider}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Insurance Number</label>
                  <p className="text-gray-900">{profile.insurance_number}</p>
                </div>
                {profile.pdf_url && (
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-500">Document</label>
                    <p className="text-gray-900">
                      <button 
                        onClick={handleViewDocument}
                        className="text-blue-600 hover:underline focus:outline-none"
                      >
                        View Document
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <ProfileForm 
                onSubmit={handleSaveProfile} 
                loading={formLoading}
                initialData={profile}
                onCancel={() => setEditing(false)}
              />
            </div>
          )
        ) : (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Create Your Health Profile</h3>
              <p className="text-gray-500">Please fill out your health information to get started.</p>
            </div>
            <ProfileForm 
              onSubmit={handleSaveProfile} 
              loading={formLoading}
              initialData={null}
              onCancel={undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;