import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5269/api/auth';
  async login(
    email: string,
    password: string
  ): Promise<{ message: string; data: string; errors: {}; success: false }> {
    const response = await fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.errors != null) {
      return data;
    }
    return data.result.value;
  }
}
