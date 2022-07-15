import React from 'react';
import ContactCard from './ContactCard'
import {Link} from 'react-router-dom'

class ContactList extends React.Component {  
    constructor(props) {
        super(props)
        this.state = {
            term: ""
        }
    }
    
    render() {
        const deleteContactHandler = (id) => {
            this.props.getContactHandler(id)
        }

         const renderContactList = this.props.contacts.map((contact) => {
            return(
                <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}></ContactCard>
            )
        })


        const getSearchTerm = (e) => {
           this.setState({term:e.target.value})
           this.props.searchKeyword(this.state.term)
        }

        return(
            <div className="main">
                <h2>
                    Contact List
                    <Link to="/add">
                        <button className="ui button blue right">
                            Add Contact  
                            
                        </button>
                    </Link>
                </h2>
                <div className="ui search">
                    <div className="ui icon input">
                        <input type="text" placeholder="Search Contacts" className="prompt" value={this.state.term} onChange={getSearchTerm}/>
                        <i className="search icon"></i>
                    </div>
                </div>
                <div className="ui celled list">{renderContactList.length > 0 ? renderContactList: "No Contacts Available"}</div>
            </div>            
        );
    }
}

export default ContactList;