/** @format */
import fs from "fs/promises";
import {nanoid} from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

const writeContacts = (contacts) => {
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await writeContacts(contacts);
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}
export {listContacts, getContactById, removeContact, addContact};
