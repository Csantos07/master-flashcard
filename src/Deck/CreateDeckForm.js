import React, { useState } from 'react';
import { createDeck } from '../utils/api';
import { useHistory } from 'react-router-dom';

function CreateDeckForm({ setDecks }) {

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('Form submitted:', formData);

      let newDeck = await createDeck(formData);
      setDecks((prevDecks) => [...prevDecks, newDeck]);

      history.push('/');
    } catch (error) {
      console.error('Error creating deck:', error);
      // Handle the error as needed
    }
  };
  return (
    <>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstName'>Name:</label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleInputChange}
          placeholder='Deck Name'
          required
        />
        <br />
        <label htmlFor='Description'>Description:</label>
        <input
          type='text'
          id='description'
          name='description'
          value={formData.description}
          onChange={handleInputChange}
          placeholder='Brief Description of the Deck'
          required
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default CreateDeckForm;
