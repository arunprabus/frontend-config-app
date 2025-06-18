import React from 'react';
import { User, Mail, Shield, FileText, Calendar, Trash2 } from 'lucide-react';

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

interface ProfileListProps {
  profiles: Profile[];
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
}

export const ProfileList: React.FC<ProfileListProps> = ({ profiles, onDelete, loading = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBloodGroupColor = (bloodGroup: string) => {
    const colors: { [key: string]: string } = {
      'O+': 'bg-red-100 text-red-800',
      'O-': 'bg-red-200 text-red-900',
      'A+': 'bg-blue-100 text-blue-800',
      'A-': 'bg-blue-200 text-blue-900',
      'B+': 'bg-green-100 text-green-800',
      'B-': 'bg-green-200 text-green-900',
      'AB+': 'bg-purple-100 text-purple-800',
      'AB-': 'bg-purple-200 text-purple-900'
    };
    return colors[bloodGroup] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Profiles Found</h3>
        <p className="text-gray-500">Create your first health profile to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Health Profiles</h2>
        <span className="text-sm text-gray-500">{profiles.length} profile(s)</span>
      </div>

      <div className="space-y-4">
        {profiles.map((profile) => (
          <div key={profile.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <User className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-medium text-gray-900">{profile.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBloodGroupColor(profile.bloodGroup)}`}>
                    {profile.bloodGroup}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{profile.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{profile.insurance}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{profile.idProof}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Created: {formatDate(profile.createdAt)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDelete(profile.id)}
                className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Delete profile"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};