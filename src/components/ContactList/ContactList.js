import {
  List,
  Button

} from "./ContactList.styled";

const ContactList = ({ contacts, onDeleteName }) => {
  return contacts.length === 0 ? (
      <p>The phonebook is empty</p>
  ) : (
  <List>        
      {contacts.map(({id, name, number}) => (
          <li key={id}>
             {name}: {number}
        <Button
          className="button"
          type="button"
          onClick={() => onDeleteName(id)}
        >
          Delete
        </Button>
      </li>
    ))}
  </List>
);
};
export default ContactList;