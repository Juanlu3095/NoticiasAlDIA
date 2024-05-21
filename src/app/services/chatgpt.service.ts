import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  private apikeyGpt = environment.apiGPT;
  private apiUrl = 'https://api.openai.com/v1/engines/gpt-4o/completions';

  constructor(private http: HttpClient) { }

  getChatGPTResponse(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apikeyGpt}`
    });

    const body = {
      model: 'gpt-4.0-turbo',
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
