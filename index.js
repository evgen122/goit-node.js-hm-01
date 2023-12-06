/** @format */

import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";

import {program} from "commander";

// const {Command} = require("commander");
// const program = new Command();

async function invokeAction({action, id, name, email, phone}) {
  switch (action) {
    case "list":
      // ...
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      // ... id
      const oneContact = await getContactById(id);
      console.table(oneContact);
      break;

    case "add":
      // ... name email phone
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      // ... id
      const deleteContact = await removeContact(id);
      console.table(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

// program.parse(process.argv);
program.parse();

const argv = program.opts();

invokeAction(argv);

// invokeAction({ action: "read" });
// invokeAction({action: "get", id: "drsAJ4SHPYqZeG-83QTVW"});
// invokeAction({action: "remove", id: "drsAJ4SHPYqZeG-83QTVW"});
