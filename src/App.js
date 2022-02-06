import React, { Component } from 'react';
import Form from './components/ContactForm/ContactForm';
import shortid from 'shortid';
import Filter from "./components/filter/Filter";
import ContactList from './components/ContactList/ContactList';


class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };
  
 componentDidMount(prevProps, prevState) {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

getSubmitForm = ({ name, number }) => {
    const normalazedFind = name.toLowerCase();

    const isName = this.state.contacts.find(
      (contact) => contact.name.toLowerCase() === normalazedFind
    );
    if (isName) {
      return alert(`${name} is already in contacts.`);
    }

    this.setState((prevstate) => ({
      contacts: [{ name, number, id: shortid(5) }, ...prevstate.contacts],
    }));
  };

  deleteName = (id) => {
    this.setState((prevstate) => ({
      contacts: prevstate.contacts.filter((contact) => contact.id !== id),
    }));
  };
  getVisibleContacts = () => {
  const { filter, contacts} = this.state
  const normalizedFilter = filter.toLowerCase();
  return contacts.filter(contact => 
    contact.name.toLowerCase().includes(normalizedFilter)
    )
  }
  
  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
   
        <div>
          <h2>Phonebook</h2>
          <Form submitForm={this.getSubmitForm} />
          <h2>Contacts</h2>
 
          <Filter handleChange={this.handleChange} filter={this.state.filter} />
          <ContactList 
          contacts={visibleContacts}
          onDeleteName={this.deleteName}
          />
</div>
//  </div>
    );
  }
}

export default App;


