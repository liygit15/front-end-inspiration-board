import { useState } from 'react';


const kDefaultFormState = {
  message: '',
  likes_count: 0
};

const NewCardForm = ({ onHandleSubmitCard, selectedBoardId }) => {
  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const inputName = event.target.name;
    setFormData(formData => {
      return {
        ...formData,
        [inputName]: inputValue
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCard = {
      message: formData.message,
      likes_count: 0,
      board_id: selectedBoardId
    };

    onHandleSubmitCard(newCard);
    setFormData(kDefaultFormState);
  };

  const makeControlledInput = (inputName) => {
    return (
      <div>
        <label htmlFor={inputName}>
          {inputName}
        </label>
        <input
          type='text'
          name={inputName}
          id={inputName}
          value={formData[inputName]}
          onChange={handleChange}
        />
      </div>
    );
  };

  return (
    <div>
      <h1>Create a card</h1>
      <form onSubmit={handleSubmit}>
        {makeControlledInput('message')}

        <div>
          <input type="submit" value="Create card" />
        </div>
      </form>
    </div>
  );
};

export default NewCardForm;