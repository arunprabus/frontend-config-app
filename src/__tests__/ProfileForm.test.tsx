import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileForm } from '../components/ProfileForm';

describe('ProfileForm Component', () => {
  const mockSubmit = vi.fn();
  
  it('renders form fields correctly', () => {
    render(<ProfileForm onSubmit={mockSubmit} />);
    
    // Check if all form fields are rendered
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Blood Group/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Insurance Provider/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Insurance Number/i)).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    render(<ProfileForm onSubmit={mockSubmit} />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Blood Group/i), { target: { value: 'A+' } });
    fireEvent.change(screen.getByLabelText(/Insurance Provider/i), { target: { value: 'Health Insurance Inc.' } });
    fireEvent.change(screen.getByLabelText(/Insurance Number/i), { target: { value: '12345678' } });
    
    // Submit the form
    fireEvent.click(screen.getByText(/Create Profile/i));
    
    // Check if onSubmit was called with correct data
    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      blood_group: 'A+',
      insurance_provider: 'Health Insurance Inc.',
      insurance_number: '12345678',
      pdf_url: ''
    });
  });

  it('shows edit mode with initial data', () => {
    const initialData = {
      name: 'Jane Smith',
      blood_group: 'O-',
      insurance_provider: 'Medical Insurance Co.',
      insurance_number: '87654321',
      pdf_url: ''
    };
    
    render(<ProfileForm onSubmit={mockSubmit} initialData={initialData} />);
    
    // Check if form is pre-filled with initial data
    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Jane Smith');
    expect(screen.getByLabelText(/Blood Group/i)).toHaveValue('O-');
    expect(screen.getByLabelText(/Insurance Provider/i)).toHaveValue('Medical Insurance Co.');
    expect(screen.getByLabelText(/Insurance Number/i)).toHaveValue('87654321');
    
    // Should show update button instead of create
    expect(screen.getByText(/Update Profile/i)).toBeInTheDocument();
  });
});