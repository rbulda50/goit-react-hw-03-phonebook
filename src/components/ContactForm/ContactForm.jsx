import React, { Component } from "react";
import css from './ContactForm.module.css';

class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    };

    handleChange = (e) => {
        const { name, value } = e.currentTarget;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({ name: '', number: '' })
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className={css.Form}>
            <label className={css.Form__label}>Name
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={this.handleChange}
                    className={css.Form__input}
                    placeholder='Write your name'
                />
            </label>
            <label className={css.Form__label}>Number
                <input
                    type="tel"
                    name="number"
                    value={this.state.number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={this.handleChange}
                        className={css.Form__input}
                        placeholder='Write your phone number'
                />
            </label>
                <button
                    type="submit"
                    className={css.Form__button}
                >Add contact</button>
        </form>
        )
    }
}

export default ContactForm;