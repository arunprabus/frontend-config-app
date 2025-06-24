import { describe, it, expect } from 'vitest';
import { 
  isValidEmail, 
  isValidPassword, 
  isValidBloodGroup,
  isValidFileSize,
  isValidFileType,
  validateProfileForm
} from '../utils/validation';

describe('Validation Utils', () => {
  describe('isValidEmail', () => {
    it('validates correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(isValidEmail('test')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test@example')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('validates strong passwords', () => {
      expect(isValidPassword('Password123')).toBe(true);
      expect(isValidPassword('StrongP4ssword')).toBe(true);
    });

    it('rejects weak passwords', () => {
      expect(isValidPassword('password')).toBe(false); // no uppercase, no number
      expect(isValidPassword('PASSWORD')).toBe(false); // no lowercase, no number
      expect(isValidPassword('12345678')).toBe(false); // no letters
      expect(isValidPassword('Pass1')).toBe(false);    // too short
    });
  });

  describe('isValidBloodGroup', () => {
    it('validates correct blood groups', () => {
      expect(isValidBloodGroup('A+')).toBe(true);
      expect(isValidBloodGroup('O-')).toBe(true);
      expect(isValidBloodGroup('AB+')).toBe(true);
    });

    it('rejects invalid blood groups', () => {
      expect(isValidBloodGroup('C+')).toBe(false);
      expect(isValidBloodGroup('A')).toBe(false);
      expect(isValidBloodGroup('')).toBe(false);
    });
  });

  describe('isValidFileSize', () => {
    it('validates files within size limit', () => {
      const fiveMB = 5 * 1024 * 1024;
      expect(isValidFileSize(fiveMB, 10)).toBe(true);
    });

    it('rejects files exceeding size limit', () => {
      const fifteenMB = 15 * 1024 * 1024;
      expect(isValidFileSize(fifteenMB, 10)).toBe(false);
    });
  });

  describe('isValidFileType', () => {
    it('validates allowed file types', () => {
      expect(isValidFileType('application/pdf')).toBe(true);
      expect(isValidFileType('image/jpeg')).toBe(true);
    });

    it('rejects disallowed file types', () => {
      expect(isValidFileType('text/plain')).toBe(false);
      expect(isValidFileType('application/javascript')).toBe(false);
    });
  });

  describe('validateProfileForm', () => {
    it('validates correct profile data', () => {
      const validData = {
        name: 'John Doe',
        blood_group: 'A+',
        insurance_provider: 'Health Insurance Inc.',
        insurance_number: '12345678'
      };
      
      expect(validateProfileForm(validData)).toEqual({ isValid: true });
    });

    it('rejects profile with missing name', () => {
      const invalidData = {
        name: '',
        blood_group: 'A+',
        insurance_provider: 'Health Insurance Inc.',
        insurance_number: '12345678'
      };
      
      expect(validateProfileForm(invalidData).isValid).toBe(false);
    });

    it('rejects profile with invalid blood group', () => {
      const invalidData = {
        name: 'John Doe',
        blood_group: 'X+',
        insurance_provider: 'Health Insurance Inc.',
        insurance_number: '12345678'
      };
      
      expect(validateProfileForm(invalidData).isValid).toBe(false);
    });
  });
});