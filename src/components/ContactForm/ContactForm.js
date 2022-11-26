import React from 'react';
import { Form, Label } from './ContactForm.styled';
import PropTypes from 'prop-types';

class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const isSuccess = this.props.addContacts(this.state);

    if (isSuccess) {
      this.reset();
    }
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="Form_block">
        <Label className="Lable">
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleChange}
          />
        </Label>
        <Label className="Lable">
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleChange}
          />
        </Label>

        <button type="submit">Add contact</button>
      </Form>
    );
  }
}
export default ContactForm;

ContactForm.propTypes = {
  addContacts: PropTypes.func.isRequired,
};
