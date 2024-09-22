import { signal } from '@angular/core';
import { Contact } from '../../core/services/contacts.service';

const contactsSignal = signal<Contact[]>([]);

export const ContactStore = {

  contacts: contactsSignal,

  setContacts: (contacts: Contact[]) => {
    contactsSignal.set(contacts);
  },

  updateContact: (updatedContact: Contact) => {
    const currentContacts = contactsSignal();
    const updatedContacts = currentContacts.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    contactsSignal.set(updatedContacts);
  },

  deleteContact: (contactId: number) => {
    const currentContacts = contactsSignal();
    const updatedContacts = currentContacts.filter(contact => contact.id !== contactId);
    contactsSignal.set(updatedContacts);
  }
}
