import React, { useEffect, useState } from 'react';
import Form from './components/ContactForm/ContactForm';

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
  
 
// const handleChange = (event) => {
//   setFilter(event.target.value);
//   };

  const handleSubmit = contact => {
    contacts.some(contactItem =>
        contactItem.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase())
      ? alert(`${contact.name} is already in contacts`)
      : setContacts(( prevContacts => [...prevContacts, contact]));
    resetFilter()
  };

  const handleFilterName = event => {setFilter(event.target.value)};
  

  const deleteName = name => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== name))};
  

  const filterVisibleContacts = () => contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()));
  
  const resetFilter = () => setFilter('');


    return (
        <div>
          <h2>Phonebook</h2>
          <Form submitForm={handleSubmit}/>
          <h2>Contacts</h2>
 
          <Filter onChange={handleFilterName} value={filter} />
          <ContactList 
          contacts={filterVisibleContacts()}
          onDeleteName={deleteName}
          />
</div>
);
}



