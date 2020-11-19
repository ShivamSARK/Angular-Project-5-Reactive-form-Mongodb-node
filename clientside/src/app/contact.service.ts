import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Contact} from './contact';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  selectedContact:Contact;
  contacts:Contact[];

  constructor(private http:HttpClient) { }
  //Retrieving Contacts
 getData(){
  return this.http.get('http://localhost:4000/contacts')
 }
 addContacts(newContact){
   
   return this.http.post('http://localhost:4000/contacts',newContact);
 }
  deleteContact(id){
    return this.http.delete('http://localhost:4000/contacts/'+id);
  }
 updateContact(updatedContact,id){
   return this.http.put('http://localhost:4000/contacts/'+id,updatedContact)
 }
 
}
