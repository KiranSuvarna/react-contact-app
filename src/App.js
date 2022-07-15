import './App.css';
import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'
import ContactDetail  from './components/ContactDetail';
import {v4 as uuidv4} from 'uuid'
import api  from './api/contact'
import  {BrowserRouter, Switch, Route} from 'react-router-dom';
import EditContact from './components/EditContact';

function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const addContactHandler = async (contact) => {
    setContacts([...contacts, await (await api.post("/contacts", {id: uuidv4(), ...contact})).data]) 
  }

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact)
    const {id} = response.data
    setContacts(contacts.map(contact => {
      return contact.id === id ? {...response.data}: contact
    }))
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm)
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      })
      setSearchResults(newContactList)
    }
    else {
      setSearchResults(contacts)
    }
  }

  const removeContacthandler = async (id) => {
    await api.delete(`/contacts/${id}`)
    const filteredContactsCopy = contacts.filter((contact) => {
      return contact.id !== id;
    })

    setContacts(filteredContactsCopy);
  }

  const retrieveContactsFromServer = async () => {
    const response = await api.get("/contacts")
    return response.data
  }

  useEffect(() => {
    const getContacts = async () => {
      const contactsFromServer = await retrieveContactsFromServer()
      if (contactsFromServer) setContacts(contactsFromServer)
    }
    
    getContacts()
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts]);

  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
          <Switch>
            <Route exact path="/" render={(props) => <ContactList {...props} contacts={searchTerm.length < 1 ? contacts: searchResults} getContactHandler={removeContacthandler} term={searchTerm} searchKeyword={searchHandler}/>} />
            <Route path="/add" render={(props) => <AddContact {...props} addContactHandler={addContactHandler}/>}/>
            <Route path="/contact/:id" component={ContactDetail} />
            <Route path="/edit" render={(props) => <EditContact {...props} updateContactHandler={updateContactHandler}/>}/>
          </Switch>      
      </BrowserRouter> 
    </div>
  );
}

export default App;
