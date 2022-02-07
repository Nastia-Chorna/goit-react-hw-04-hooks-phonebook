import React, { useEffect, useState } from 'react';
import Form from './components/ContactForm/ContactForm';
// import { nanoid } from "nanoid";
import Filter from "./components/filter/Filter";
import ContactList from './components/ContactList/ContactList';

export default function App () {
  const [contacts, setContacts] = useState(() => {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts ?? [];
  });
  const [filter, setFilter] = useState("")

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  
 
const handleChange = (event) => {
  setFilter(event.target.value);
  };

  const handlerSubmitUserForm = contact => {
    contacts.some(contactItem =>
        contactItem.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase())
      ? alert(`${contact.name} is already in contacts`)
      : setContacts(( prevContacts => [...prevContacts, contact]));
    resetFilter()
  };

  const deleteName = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const filterVisibleContacts = () => contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()));
    const resetFilter = () => setFilter('');
    return (
        <div>
          <h2>Phonebook</h2>
          <Form submitForm={handlerSubmitUserForm}/>
          <h2>Contacts</h2>
 
          <Filter handleChange={handleChange} filter={filter} />
          <ContactList 
          contacts={filterVisibleContacts}
          onDeleteName={deleteName}
          />
</div>
);
}



