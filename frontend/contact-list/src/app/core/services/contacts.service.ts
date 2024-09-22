import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export type Contact = {
  id: number,
  name: string,
  lastname: string,
  phone: string,
  address: string,
  email: string,
  mobilePhone: string
}


@Injectable({
  providedIn: 'root'
})
export class ContactAPIService {

  private endpointUrl = 'http://localhost:4000/contact'

  constructor(private http: HttpClient) {}

  getContacts(){
    return this.http.get<Contact[]>(this.endpointUrl);
  }

  updateContact(contactId: number, contact: Contact){
    return this.http.patch<Contact>(`${this.endpointUrl}/${contactId}`, contact)
  }

  deleteContact(contactId: number){
    return this.http.delete<Contact>(`${this.endpointUrl}/${contactId}`)
  }

  createContact(contact: Contact){
    return this.http.post<{ id: number }>(this.endpointUrl, contact)
  }
}
