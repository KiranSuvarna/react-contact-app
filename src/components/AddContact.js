import React from 'react';

class AddContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: ""
        }
    }

    addContact = (e) => {
        e.preventDefault()
        if (this.state.name === "" || this.state.email === "") {
            alert("All the fields are required")
            return
        }

        this.props.addContactHandler(this.state)
        this.setState({name:"", email:""})
        this.props.history.push("/")
    }

   render() {
    return(
        <div className="ui main">
            <h2> Add Contact</h2>
            <form className="ui form" onSubmit={this.addContact}>
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
                <button className="ui button blue">Add</button>
            </form>
        </div>
    );
   }
}

export default AddContact;