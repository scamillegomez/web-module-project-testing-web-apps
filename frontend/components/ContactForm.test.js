import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
    const shortFirstName = 'syd';
    const firstName = 'sydney';
    const lastName = 'gomez';
    const email = 'tootles@whoareyou.com';
    const message = 'this is a test message';
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const shortFirstName = 'syd';
    const firstNameInput = screen.getByPlaceholderText('Edd');
    userEvent.type(firstNameInput,shortFirstName);
    await waitFor(()=>{
        const errorMessages = screen.getAllByTestId('error');
        expect(errorMessages).toHaveLength(1);
    })
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(()=>{
        const errorMessages = screen.getAllByTestId('error');
        expect(errorMessages).toHaveLength(3);
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const button = screen.getByRole('button');
    const firstNameInput = screen.getByPlaceholderText('Edd');
    const lastNameInput = screen.getByPlaceholderText('Burke');
    

    userEvent.type(firstNameInput,'Sydney');
    userEvent.type(lastNameInput,'Gomez');
    userEvent.click(button);

    await waitFor(()=>{
        const errorMessages = screen.getAllByTestId('error');
        expect(errorMessages).toHaveLength(1);
    })

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(emailInput,'ffff');
    await waitFor(()=>{
        emailErrorMessage = screen.getByText(/email must be a valid email address/i);
        expect(emailErrorMessage).toBeVisible();
    })
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(()=>{
        lastNameErrorMessage = screen.getByText(/lastName is a required field/i);
        expect(lastNameErrorMessage).toBeVisible();
    })
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const button = screen.getByRole('button');
    const firstNameInput = screen.getByPlaceholderText('Edd');
    const lastNameInput = screen.getByPlaceholderText('Burke');
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');

    userEvent.type(firstNameInput,'SydneyR');
    userEvent.type(lastNameInput,'Gomez');
    userEvent.type(emailInput,'sydneycamille0896@gmail.com')
    userEvent.click(button);

    await waitFor(()=>{
        firstNameFeedback = screen.queryByText(/sydneyr/i);
        lastNameFeedback = screen.queryByText(/gomez/i);
        emailFeedback = screen.queryByText(/sydneycamille0896@gmail.com/i);
        expect(firstNameFeedback).toBeVisible();
        expect(lastNameFeedback).toBeVisible();
        expect(emailFeedback).toBeVisible();

        const errorMessages = screen.queryByText('error');
        expect(errorMessages).toBeNull();
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const button = screen.getByRole('button');
    const firstNameInput = screen.getByPlaceholderText('Edd');
    const lastNameInput = screen.getByPlaceholderText('Burke');
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    const messageInput = screen.queryByLabelText('Message');

    userEvent.type(firstNameInput,'SydneyR');
    userEvent.type(lastNameInput,'Gomez');
    userEvent.type(emailInput,'sydneycamille0896@gmail.com');
    userEvent.type(messageInput, 'Hi there!');
    userEvent.click(button);

    await waitFor(()=>{
        firstNameFeedback = screen.queryByText(/sydneyr/i);
        lastNameFeedback = screen.queryByText(/gomez/i);
        emailFeedback = screen.queryByText(/sydneycamille0896@gmail.com/i);
        messageFeedback = screen.queryByText(/hi there!/i);
        expect(firstNameFeedback).toBeVisible();
        expect(lastNameFeedback).toBeVisible();
        expect(emailFeedback).toBeVisible();
        expect(messageFeedback).toBeVisible();

        const errorMessages = screen.queryByText('error');
        expect(errorMessages).toBeNull();
    })
});
