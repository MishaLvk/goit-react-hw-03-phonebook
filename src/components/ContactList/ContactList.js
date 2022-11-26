import React from 'react';
import PropTypes from 'prop-types';
import { ListContact, ContactList_list } from './ContactList.styled';

const ContactList = ({ filterContacts, deleteContact }) => (
  <ListContact className="ContactList">
    {filterContacts.map(contact => (
      <ContactList_list className="ContactList_list" key={contact.key}>
        {contact.name}: {contact.number}
        <button onClick={() => deleteContact(contact.key)}>Delete</button>
      </ContactList_list>
    ))}
  </ListContact>
);

export default ContactList;

ContactList.propTypes = {
  filterContacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
