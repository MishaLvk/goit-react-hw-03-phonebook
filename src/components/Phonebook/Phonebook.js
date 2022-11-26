import React from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import { Container } from './PhoneBook.styled';

class Phonebook extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContacts = formData => {
    const { name, number } = formData;
    const contact = {
      name: name,
      number: number,
      key: nanoid(),
    };
    if (this.checkName(name)) {
      alert(name + ' is already in contacts');
      return false;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
    return true;
  };

  checkName = name => {
    const { contacts } = this.state;
    const normalisedFilter = name.toLocaleLowerCase();

    return contacts.some(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  deleteContact = contactKey => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.key !== contactKey
      ),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getfilterContacts = () => {
    const { filter, contacts } = this.state;
    const normalisedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  render() {
    const filterContacts = this.getfilterContacts();
    return (
      <Container className="Phonebook_container">
        <h1>Phonebook</h1>
        <ContactForm addContacts={this.addContacts} />
        <h2>Contacts</h2>
        {this.state.contacts.length !== 0 && (
          <Filter value={this.state.filter} onChange={this.changeFilter} />
        )}

        <ContactList
          filterContacts={filterContacts}
          deleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default Phonebook;
