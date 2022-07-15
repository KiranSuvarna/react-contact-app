import React from 'react';

class EditContact extends React.Component {
    constructor(props) {
        super(props);
        const {id, name, email} = props.location.state.contact;
        this.state = {
            id,
            name,
            email,
        }
    }

    updateContact = (e) => {
        e.preventDefault()
        if (this.state.name === "" || this.state.email === "") {
            alert("All the fields are required")
            return
        }

        this.props.updateContactHandler(this.state)
        this.setState({name:"", email:""})
        this.props.history.push("/")
    }

   render() {
    return(
        <div className="ui main">
            <h2> Edit Contact</h2>
            <form className="ui form" onSubmit={this.updateContact}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" 
                    name="name" 
                    placeholder="Name" 
                    onChange= {(e) => this.setState({name: e.target.value})}
                    value={this.state.name}></input>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input 
                    type="text" 
                    name="email" 
                    placeholder="Email"
                    onChange={(e) => this.setState({email: e.target.value})}
                    value={this.state.email}></input>
                </div>
                <button className="ui button blue">Update</button>
            </form>
        </div>
    );
   }
}

export default EditContact;