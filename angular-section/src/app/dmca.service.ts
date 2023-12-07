import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class DmcaService {
  private apiUrl = 'http://ec2-3-90-246-226.compute-1.amazonaws.com:3000/api/superheroes/'; // Replace with your actual API URL

  constructor() {}

  async fileDmca(id:number, dateRequestRecieved:Date, dateDisputeRecieved:Date, dateNoticeSent:Date, notes:string, status:boolean): Promise<any> {
    const dmcaData = {
      id: id,
      dateRequestReceived: dateRequestRecieved,
      dateDisputeReceived: dateDisputeRecieved,
      dateNoticeSent: dateNoticeSent,
      notes:notes,
      status: status
    };
   
    const url = `${this.apiUrl}filedmca`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dmcaData)
      });
  
      // Check if the response status is in the range 200-299 (success)
      if (response.ok) {
        // Parse and return the JSON data
        return await response.json();
      } else {
        // Handle the error and throw an exception
        throw new Error(`Error filing DMCA:`);
      }
    } catch (error) {
      console.error('error:', error);
      throw error;
    }
  }


  }


