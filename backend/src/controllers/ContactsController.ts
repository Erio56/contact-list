import { Response, Request } from 'express'
import Contact from '../models/Contact.ts'

export class ContactsController {
   // { name, lastname, email, phone, address, mobilePhone }
   async addContact( request: Request, response: Response ){
      try {
         const idUser = request.params.userId;
         const contact = {
            "name": request.body.name,
            "lastname": request.body.lastname || null,
            "email": request.body.email || null,
            "phone": request.body.phone || null,
            "address": request.body.address || null,
            "mobilePhone": request.body.mobilePhone || null,
            "ownerId": idUser
        };

         if(contact.name){
            const newContact = await Contact.create(contact)
            response.status(201).json({ id: newContact.getDataValue('id') })
         } else {
            response.status(400).json({error: 'papi, la cagó'});
         }
      } catch (error) {
         console.log(error);
         response.status(500).send();
      }

   };

   async updateContact(request: Request, response: Response) {
      try {
        const idUser = request.params.userId;
        const idContact = request.params.idContact;
        const contact = { ...request.body };
    
        const [affectedCount] = await Contact.update(contact, {
          where: { id: idContact, ownerId: idUser },
        });
    
        if (affectedCount === 0) {
          return response.status(404).json({ message: 'Contact not found or no changes made' });
        }
    
        const updatedContact = await Contact.findOne({
          where: { id: idContact, ownerId: idUser },
        });
    
        response.json(updatedContact);
    
      } catch (error) {
        console.error(error);
        response.status(500).send();
      }
    }
    

   async deleteContact( request: Request, response: Response ){
      try {
         const idUser = request.params.userId;
         const idContact = request.params.idContact;
         await Contact.destroy({ where: {id: idContact, ownerId: idUser } })
         
         response.status(204).send()
      } catch (error) {
         console.log(error);
         response.status(500).send();
      }
   }; 

   async listContacts( request: Request, response: Response ){
      try {
         
         const idUser = request.params.userId;

         const result = await Contact.findAll({where: {ownerId: idUser}});
         console.log(result);

         response.json(result);

      } catch (error) {
         console.log(error)
      }

   }; 

}