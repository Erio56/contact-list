import { Router } from "express";
import { ContactsController } from "../controllers/ContactsController.ts"
import authMiddleware from "../lib/TokenMiddleware.ts";

const contactsRouter = Router()
const contactsController = new ContactsController()

contactsRouter.post('/contact', authMiddleware , contactsController.addContact );
contactsRouter.get('/contact', authMiddleware , contactsController.listContacts );
contactsRouter.patch('/contact/:idContact', authMiddleware , contactsController.updateContact );
contactsRouter.delete('/contact/:idContact', authMiddleware , contactsController.deleteContact );
// contactsRouter.post('/user/authenticate', contactsController.loginUser );


export default contactsRouter;