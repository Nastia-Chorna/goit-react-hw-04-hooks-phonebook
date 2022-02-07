import { nanoid } from 'nanoid';
import { useState } from 'react';
// import PropTypes from "prop-types";
// import shortid from 'shortid';
import {
  Wrap,
  Label,
  Input,
  Button

} from "./ContactForm.styled";

export default function Form ({submitForm}){
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  
  const handleChange = event => {
   const {name, value} = event.target;

   switch (name){
     case 'name':
     setName(value);
     break;

    case 'number':
    setNumber(event.target.value);
    break;

    default: return;

   }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const contact ={
      id: nanoid(),
      name,
      number,
    };
    submitForm(contact);
    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

return (
  <Wrap submitForm={handleSubmit}>
    <Label>Name</Label>
    <Input
      onChange={handleChange}
     
      type="text"
      name="name"
      value={name}
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
    />
    <Label>Number</Label>
    <Input
      onChange={handleChange}
      value={number}
     
      type="tel"
      name="number"
      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
      title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
      required
    />
    <Button type="submit"> Add contact</Button>
  </Wrap>
);
}

// class Form extends Component {
//     state = { name: "", number: "" };
    
// nameInputId = shortid.generate();
// phoneInputId = shortid.generate();


//   handleChange = (evt) => {
//     this.setState({ [evt.target.name]: evt.target.value });
//   };

//   handleSubmit = (evt) => {
//     evt.preventDefault();
//     this.props.submitForm(this.state);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ name: "", number: "" });
//   };

  // render() {
    
//   }
// }

// export default Form;

// Form.propTypes = {
//   submitForm: PropTypes.func.isRequired,
// };