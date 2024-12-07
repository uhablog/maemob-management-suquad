import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth0User } from './auth0User';

@Injectable()
export class Auth0Service {

  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  constructor(
    private configService: ConfigService
  ) {}

  private async getAuth0AccessToken(): Promise<string> {

    if (this.accessToken && this.tokenExpiry && this.tokenExpiry > Date.now()) {
      console.log(`キャッシュされたアクセストークンを利用`);
      return this.accessToken;
    }

    const issuerBase = this.configService.get<string>('ISSUER_BASE');
    const clientId = this.configService.get<string>('AUTH0_M2M_CLIENT_ID');
    const clientSecret = this.configService.get<string>('AUTH0_M2M_CLIENT_SECRET');

    if (!issuerBase || !clientId || !clientSecret) {
      throw new Error(`Missing required Auth0 configuration.`);
    }

    const res = await fetch(`${issuerBase}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        audience: `${issuerBase}/api/v2/`,
        grant_type: 'client_credentials'
      })
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch access token: ${res.status} ${res.statusText}`)
    }

    const data = await res.json();
    this.accessToken = data.access_token;

    console.log(`token expires in is ${data.expires_in}`);
    if (data.expires_in) {
      this.tokenExpiry = Date.now() + data.expires_in * 1000;
    }
    return this.accessToken;
  }

  async fetchAuth0User(): Promise<Auth0User[]> {

    try {

      const accessToken = await this.getAuth0AccessToken();

      const issuerBase = this.configService.get<string>('ISSUER_BASE');
      const response = await fetch(`${issuerBase}/api/v2/users`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch Auth0 users: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const auth0Users: Auth0User[] = data.map((user) => new Auth0User(
        user.name,
        user.user_id,
        user.email
      ));

      return auth0Users;
      
    } catch (error) {
      console.error(`Error fetching Auth0 user:`, error)
      throw new HttpException(
        `Error fetching auth0 user: ${error.message}`,
        error.status || 500
      )
    }
  }
}