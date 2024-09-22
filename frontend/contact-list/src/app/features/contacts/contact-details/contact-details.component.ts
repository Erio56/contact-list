import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact, ContactAPIService } from '../../../core/services/contacts.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactStore } from '../../../shared/stores/contactStore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent {


  @Input() createMode = false;
  @Input() contact: Contact | null =  null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private contactAPIService: ContactAPIService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.contact?.name || '', [Validators.required]),
      lastname: new FormControl(this.contact?.lastname || '',),
      email: new FormControl(this.contact?.email || '',),
      address: new FormControl(this.contact?.address || '',),
      mobilePhone: new FormControl(this.contact?.mobilePhone || '',),
      phone: new FormControl(this.contact?.phone || '',)
    })
  }

  close() {
    this.closeModal.emit();
  }

  saveChanges() {
    if(this.form.valid && this.contact){
      const contactToUpdate = this.form.value as Contact;
      this.contactAPIService.updateContact(this.contact.id, contactToUpdate).subscribe(
        {
          next: (response) => {
            const updatedContact = this.contact;
            if(updatedContact){
              updatedContact.name = response.name;
              updatedContact.lastname = response.lastname;
              updatedContact.email = response.email;
              updatedContact.address = response.address;
              updatedContact.mobilePhone = response.mobilePhone;
              updatedContact.phone = response.phone;

              ContactStore.updateContact(updatedContact);
            }
          },
          error: (error) => {
            console.log(error)
          }
        }
      )
    }
  }

  delete(){
    if(this.contact){
      this.contactAPIService.deleteContact(this.contact.id).subscribe(
        {
          next: () => {
            if(this.contact){
              ContactStore.deleteContact(this.contact.id)
              this.close()
            }
          },
          error: (error) => console.log(error)
        }
      )
    }
  }

  create(){
    if(this.form.valid){
      const contactToCreate = {
        id:0,
        name: '',
        lastname: '',
        email: '',
        address: '',
        mobilePhone: '',
        phone: ''
      };

      contactToCreate.name = this.form.get('name')?.value;
      contactToCreate.lastname = this.form.get('lastname')?.value;
      contactToCreate.email = this.form.get('email')?.value;
      contactToCreate.address = this.form.get('address')?.value;
      contactToCreate.mobilePhone = this.form.get('mobilePhone')?.value;
      contactToCreate.phone = this.form.get('phone')?.value;

      ContactStore.updateContact(contactToCreate);
      console.log(contactToCreate);

      this.contactAPIService.createContact(contactToCreate).subscribe(
        {
          next: (response) => {
            const currentContacts = ContactStore.contacts()
            console.log(currentContacts)
            contactToCreate.id = response.id;
            currentContacts.push(contactToCreate);
            console.log(currentContacts)
            ContactStore.setContacts(currentContacts)
            this.close();
            this.createMode = false;
            },
          error: (error) => console.log(error)
        }
      )
    }
  }



}
