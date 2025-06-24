/**
 * Validation utility functions for form inputs
 */

/**
 * Validates an email address format
 * @param email Email address to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param password Password to validate
 * @returns Boolean indicating if password meets requirements
 */
export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validates blood group format
 * @param bloodGroup Blood group to validate
 * @returns Boolean indicating if blood group is valid
 */
export const isValidBloodGroup = (bloodGroup: string): boolean => {
  const validGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  return validGroups.includes(bloodGroup);
};

/**
 * Validates file size is within limits
 * @param fileSize Size of file in bytes
 * @param maxSizeMB Maximum size in MB
 * @returns Boolean indicating if file size is valid
 */
export const isValidFileSize = (fileSize: number, maxSizeMB: number = 10): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return fileSize <= maxSizeBytes;
};

/**
 * Validates file type is allowed
 * @param fileType MIME type of file
 * @param allowedTypes Array of allowed MIME types
 * @returns Boolean indicating if file type is valid
 */
export const isValidFileType = (
  fileType: string, 
  allowedTypes: string[] = ['application/pdf', 'image/jpeg', 'image/png']
): boolean => {
  return allowedTypes.includes(fileType);
};

/**
 * Validates profile form data
 * @param data Profile form data
 * @returns Object with validation result and error message
 */
export const validateProfileForm = (data: any): { isValid: boolean; error?: string } => {
  if (!data.name || data.name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (!data.blood_group || !isValidBloodGroup(data.blood_group)) {
    return { isValid: false, error: 'Please select a valid blood group' };
  }
  
  if (!data.insurance_provider || data.insurance_provider.trim().length < 2) {
    return { isValid: false, error: 'Insurance provider is required' };
  }
  
  if (!data.insurance_number || data.insurance_number.trim().length < 2) {
    return { isValid: false, error: 'Insurance number is required' };
  }
  
  return { isValid: true };
};