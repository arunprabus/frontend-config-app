import { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand, ConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { getConfig } from '../config';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  accessToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
}

class AuthService {
  private client: CognitoIdentityProviderClient | null = null;
  private currentUser: AuthUser | null = null;

  private initializeClient() {
    const region = import.meta.env.VITE_AWS_REGION;
    if (!region) {
      throw new Error('Cognito configuration not found');
    }

    if (!this.client) {
      this.client = new CognitoIdentityProviderClient({
        region,
      });
    }
    return this.client;
  }

  async signup(credentials: SignupCredentials): Promise<{ success: boolean; message: string }> {
    try {
      const client = this.initializeClient();
      const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
      
      if (!clientId) {
        throw new Error('Cognito configuration not found');
      }

      const command = new SignUpCommand({
        ClientId: clientId,
        Username: credentials.email,
        Password: credentials.password,
        UserAttributes: [
          {
            Name: 'email',
            Value: credentials.email,
          },
        ],
      });

      await client.send(command);
      return { success: true, message: 'Signup successful. Please check your email for verification code.' };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { success: false, message: error.message || 'Signup failed' };
    }
  }

  async confirmSignup(email: string, code: string): Promise<{ success: boolean; message: string }> {
    try {
      const client = this.initializeClient();
      const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
      
      if (!clientId) {
        throw new Error('Cognito configuration not found');
      }

      const command = new ConfirmSignUpCommand({
        ClientId: clientId,
        Username: email,
        ConfirmationCode: code,
      });

      await client.send(command);
      return { success: true, message: 'Email confirmed successfully' };
    } catch (error: any) {
      console.error('Confirm signup error:', error);
      return { success: false, message: error.message || 'Confirmation failed' };
    }
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: AuthUser; message: string }> {
    try {
      const client = this.initializeClient();
      const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
      
      if (!clientId) {
        throw new Error('Cognito configuration not found');
      }

      const command = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: clientId,
        AuthParameters: {
          USERNAME: credentials.email,
          PASSWORD: credentials.password,
        },
      });

      const response = await client.send(command);
      
      if (response.AuthenticationResult?.AccessToken) {
        const accessToken = response.AuthenticationResult.AccessToken;
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        
        const user: AuthUser = {
          id: payload.sub,
          email: payload.email || credentials.email,
          username: payload.username || credentials.email,
          accessToken,
        };

        this.currentUser = user;
        localStorage.setItem('authUser', JSON.stringify(user));
        
        return { success: true, user, message: 'Login successful' };
      } else {
        return { success: false, message: 'Login failed - no access token received' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Login failed' };
    }
  }

  logout(): void {
    try {
      // Clear current user
      this.currentUser = null;
      
      // Remove from localStorage
      localStorage.removeItem('authUser');
      
      // Clear any cached tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
  
  /**
   * Refreshes the current user from localStorage
   * @returns The current user or null
   */
  refreshCurrentUser(): AuthUser | null {
    try {
      const stored = localStorage.getItem('authUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
        return this.currentUser;
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
    return this.currentUser;
  }

  getCurrentUser(): AuthUser | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    const stored = localStorage.getItem('authUser');
    if (stored) {
      try {
        this.currentUser = JSON.parse(stored);
        return this.currentUser;
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('authUser');
      }
    }

    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  getAuthHeaders(): { [key: string]: string } {
    const user = this.getCurrentUser();
    if (user?.accessToken) {
      return {
        'Authorization': `Bearer ${user.accessToken}`,
        'Content-Type': 'application/json',
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  }
}

export const authService = new AuthService();