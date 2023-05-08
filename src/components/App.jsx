import React, {Component} from "react";
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Notiflix from "notiflix";
import css from './App.module.css';

const LS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem(LS_KEY));
    const localStorageItems = localStorage.getItem(LS_KEY);

    if (localStorageItems) {
      this.setState({ contacts: parsedContacts})
    };
  };

  componentDidUpdate(prevState) {
    const prevContacts = prevState.contacts;
    const { contacts } = this.state;

    if (prevContacts !== contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts))
    };
  };

  addContact = (data) => {  
    const { name, number } = data;
    const { contacts } = this.state;

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const checkContact = contacts.find(contact =>
      contact.name === name);
    
    if (checkContact) {
      return Notiflix.Notify.failure(`${name} is already in contacts.`)
    };

    this.setState(({contacts}) => ({
      contacts: [...contacts, newContact]
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value })
  };

  getContacts = () => {
    const { contacts } = this.state;

    const normalizedFilter = this.state.filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  onDeleteContact = (contactId) => {
    this.setState(({contacts}) => ({
      contacts: contacts.filter(contact => contact.id !== contactId)
    }));
  };

  render() {
    const visibleContacts = this.getContacts();
    return (
      <div className={css.Container}>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          changeFilter={this.changeFilter} />
        <ContactList
          visibleContacts={visibleContacts}
          deleteContact={this.onDeleteContact} />
      </div>
    );
  };
};