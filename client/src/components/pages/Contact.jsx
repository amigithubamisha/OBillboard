import React, { useState, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:5000/contacts');
        const data = await response.json();
        setContacts(data.contacts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Error fetching contacts. Please try again later.');
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleDeleteContact = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/contact/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
      } else {
        console.error('Error deleting contact:', response.statusText);
        setError('Error deleting contact. Please try again later.');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError('Error deleting contact. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Contact</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="contacts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.address}</td>
                <td>{contact.message}</td>
                <td>
                  <button onClick={() => handleDeleteContact(contact._id)}>
                    <span role="img" aria-label="Delete">❌</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Contact;
