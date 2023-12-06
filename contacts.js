/** @format */
import fs from "fs/promises";
import {nanoid} from "nanoid";
import path from "path";

//  Розкоментуй і запиши значення
const contactsPath = path.resolve("db", "contacts.json");
// console.log(contactsPath);

const writeContacts = (contacts) => {
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

// TODO: задокументувати кожну функцію
async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  //   const deleteContact = contacts[index];
  const [result] = contacts.splice(index, 1);
  //   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  await writeContacts(contacts);
  return result;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  //   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  await writeContacts(contacts);
  return newContact;
}
export {listContacts, getContactById, removeContact, addContact};
