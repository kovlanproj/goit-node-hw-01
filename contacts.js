import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';
import path from 'path';

const contactsPath = path.resolve('./db/contacts.json');
const newContactsPath = path.resolve('./db/newContacts.json');

async function writeDataInFile(data) {
  await fs.writeFile(newContactsPath, JSON.stringify(data), 'utf8');
}

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactsList = contacts.map((contact) => contact.name);
    await writeDataInFile(contactsList);
    return contactsList;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const filteredContact = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    if (filteredContact) {
      await writeDataInFile(filteredContact);
      return filteredContact;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId.toString()
    );
    await writeDataInFile(filteredContacts);
    return filteredContacts;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await writeDataInFile(contacts);
    return contacts;
  } catch (error) {
    console.error(error);
  }
}

export { listContacts, getContactById, removeContact, addContact };
