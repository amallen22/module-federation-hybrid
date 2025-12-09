import { AuthManager } from '@npm_leadtech/cv-lib-auth';
import { PostAuthTokenHandler } from '../../internals/ajax/PostAuthToken/handlers';
import { API_URL, APP_CONFIG } from '../../config/appConfig';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import StoragePackage from '@npm_leadtech/cv-storage-js';

/**
 * Response from postAuthToken API
 */
export interface PostAuthTokenResponse {
  authToken: string;
  isNewUser: boolean;
  user?: string;
}

/**
 * Parameters for postAuthToken
 */
export interface PostAuthTokenParams {
  provider: string;
  providerToken: string;
  operation?: string;
}

/**
 * Wrapper for PostAuthTokenHandler.customAction
 * Posts authentication token from OAuth providers (Google, LinkedIn)
 * 
 * @param params - Authentication parameters
 * @returns Promise with auth token and user info
 */
export async function postAuthToken(
  params: PostAuthTokenParams
): Promise<PostAuthTokenResponse> {
  const handler = new PostAuthTokenHandler();
  return handler.customAction(params) as Promise<PostAuthTokenResponse>;
}

/**
 * Creates an AuthManager instance
 * 
 * @param sessionStore - Session store instance
 * @returns AuthManager instance or undefined if config is missing
 */
export function createAuthManager(sessionStore: any): AuthManager | undefined {
  const { clientId, userPoolId } = APP_CONFIG.cognitoLoginConfig || {};

  if (!clientId || !userPoolId) {
    return undefined;
  }

  const poolData = {
    UserPoolId: userPoolId,
    ClientId: clientId,
  };

  const AmazonCognitoIdentity = {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
  };

  return new AuthManager(
    AmazonCognitoIdentity,
    sessionStore,
    poolData,
  );
}

/**
 * Wrapper for AuthManager.signIn
 * Signs in a user with email and password
 * 
 * @param authManager - AuthManager instance
 * @param email - User email
 * @param password - User password
 * @returns Promise that resolves with Cognito token
 */
export function signInWithCognito(
  authManager: AuthManager,
  email: string,
  password: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    authManager.signIn(
      email,
      password,
      (token: string) => resolve(token),
      (error: string | Error) => {
        const errorMessage = typeof error === 'string' ? error : error.message;
        reject(new Error(errorMessage));
      }
    );
  });
}

/**
 * Wrapper for AuthManager.signUp
 * Signs up a new user with email and password
 * 
 * @param authManager - AuthManager instance
 * @param email - User email
 * @param password - User password
 * @returns Promise that resolves when signup is successful
 */
export function signUpWithCognito(
  authManager: AuthManager,
  email: string,
  password: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    authManager.signUp(
      email,
      password,
      () => resolve(),
      (error: string | Error) => {
        const errorMessage = typeof error === 'string' ? error : error.message;
        reject(new Error(errorMessage));
      }
    );
  });
}

/**
 * Wrapper for AuthManager.rescuePassword
 * Sends password rescue email
 * 
 * @param authManager - AuthManager instance
 * @param email - User email
 * @returns Promise that resolves when email is sent
 */
export function rescuePassword(
  authManager: AuthManager,
  email: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    authManager.rescuePassword(
      email,
      () => resolve(),
      (error: string | Error) => {
        const errorMessage = typeof error === 'string' ? error : error.message;
        reject(new Error(errorMessage));
      }
    );
  });
}

/**
 * Wrapper for AuthManager.resetPassword
 * Resets password with verification code
 * 
 * @param authManager - AuthManager instance
 * @param verificationCode - Verification code from email
 * @param newPassword - New password
 * @returns Promise that resolves when password is reset
 */
export function resetPassword(
  authManager: AuthManager,
  verificationCode: string,
  newPassword: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    authManager.resetPassword(
      verificationCode,
      newPassword,
      () => resolve(),
      (error: string | Error) => {
        const errorMessage = typeof error === 'string' ? error : error.message;
        reject(new Error(errorMessage));
      }
    );
  });
}

