import React, {Component} from 'react';

class Students extends Component {

    state = {
        list: [],
        firstNameInput:''
    };


    handleChange = (event) => {
        this.setState({
            firstNameInput: event.target.value
        })

    };

    handleSubmit = () => {
        this.setState({
            list: [...this.state.list, {"firstName" : this.state.firstNameInput}]
        })
    };


    render() {
        const list = this.state.list;
        return (
            <div className="Students">

                    <input type="text" value={this.state.firstNameInput}
                    onChange={this.handleChange}/>
                    <button onClick={this.handleSubmit}>Valider</button>

                <ul>
                {
                    list.map((element) =>
                    <li>{element.firstName}</li>
                    )
                }
                </ul>
            </div>
        );
    }
}


export default Students;
