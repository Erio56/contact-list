import { Component } from '@angular/core';
import { Contact, ContactAPIService } from '../../../core/services/contacts.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { JsonPipe } from '@angular/common';
import { ContactStore } from '../../../shared/stores/contactStore';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ContactDetailsComponent, JsonPipe],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {

  contacts = ContactStore.contacts;
  selectedContact: Contact| null = null;
  creationModeModal: boolean = false;
  modalIsOpen = false;

  constructor(private contactAPIService: ContactAPIService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  openModal(contact: Contact) {
    this.selectedContact = contact;
    this.modalIsOpen = true
    this.creationModeModal = false;
  }

  openCreationModal() {
    this.creationModeModal = true;
    this.modalIsOpen = true;
  }

  closeModal() {
    this.selectedContact = null;
    this.modalIsOpen = false;
    this.creationModeModal = false;
  }

  getContacts(){
    this.contactAPIService.getContacts().subscribe(
      {
        next: (contacts) => {
          ContactStore.setContacts(contacts);
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }
}
