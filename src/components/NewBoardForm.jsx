import { useState } from 'react';


const kDefaultFormState = {
  title: '',
  owner: ''
};

const NewBoardForm = ({ onHandleSubmitBoard }) => {
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
    const newBoard = {
      ...formData
    };
    onHandleSubmitBoard(newBoard);
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
      <h1>Create a board</h1>
      <form onSubmit={handleSubmit}>
        {makeControlledInput('title')}
        {makeControlledInput('owner')}

        <div>
          <input type="submit" value="Create board" />
        </div>
      </form>
    </div>
  );
};

export default NewBoardForm;