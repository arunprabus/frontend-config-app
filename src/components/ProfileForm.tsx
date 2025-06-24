import React, { useState } from 'react';
import { User, Mail, Shield, FileText, Upload, Save } from 'lucide-react';
import { authService } from '../services/auth.service';

interface ProfileFormData {
  name: string;
  blood_group: string;
  insurance_provider: string;
  insurance_number: string;
  pdf_url?: string;
}

interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => Promise<void>;
  loading?: boolean;
  initialData?: ProfileFormData | null;
  onCancel?: () => void;
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, loading = false, initialData, onCancel }) => {
  const [formData, setFormData] = useState<ProfileFormData>(
    initialData || {
      name: '',
      blood_group: '',
      insurance_provider: '',
      insurance_number: '',
      pdf_url: ''
    }
  );

  const [file, setFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a PDF file only');
      e.target.value = '';
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append('document', file);

      const config = {
        apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
      };

      const response = await fetch(`${config.apiUrl}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authService.getCurrentUser()?.accessToken}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        alert(`✅ Document uploaded successfully!\n\nFile: ${file.name}\nSize: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
        setFile(null);
        // Reset file input
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        // Refresh profile to show updated document
        if (onSubmit) {
          window.location.reload();
        }
      } else {
        alert(`❌ Upload failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`❌ Upload failed: ${error.message || 'Please try again.'}`);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    
    // Reset form after successful submission
    setFormData({
      name: '',
      blood_group: '',
      insurance_provider: '',
      insurance_number: '',
      pdf_url: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <User className="h-6 w-6 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">Create Health Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <label htmlFor="blood_group" className="block text-sm font-medium text-gray-700 mb-2">
              Blood Group
            </label>
            <select
              id="blood_group"
              name="blood_group"
              value={formData.blood_group}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select blood group</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          {/* Insurance Provider */}
          <div>
            <label htmlFor="insurance_provider" className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Provider
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="insurance_provider"
                name="insurance_provider"
                value={formData.insurance_provider}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter insurance provider"
              />
            </div>
          </div>

          {/* Insurance Number */}
          <div className="md:col-span-2">
            <label htmlFor="insurance_number" className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Number
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="insurance_number"
                name="insurance_number"
                value={formData.insurance_number}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter insurance number"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 mb-6">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            <span>{loading ? 'Saving...' : (initialData ? 'Update Profile' : 'Create Profile')}</span>
          </button>
        </div>

        {/* File Upload Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Document Upload</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                Upload PDF Document
              </label>
              <input
                type="file"
                id="file-upload"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {file && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-blue-900">Selected File:</p>
                    <p className="text-sm text-blue-700">{file.name}</p>
                    <p className="text-xs text-blue-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    disabled={uploadLoading}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{uploadLoading ? 'Uploading...' : 'Upload Document'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>


      </form>
    </div>
  );
};