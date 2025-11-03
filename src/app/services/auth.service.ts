import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8080/auth/login";

  async registerUser(userData: UserInterface) : Promise<Object | undefined>{
    const data = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    });

    return (await data.json() ?? {});
  }

}
