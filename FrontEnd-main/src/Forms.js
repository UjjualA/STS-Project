import React, { Component } from "react";
import axios from "axios";
import "./Neww.css";
import "./Table.css";

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            device_name: "",
            connected: "",
            status: "",
            password: "",
            limited: "",
            fuelData: [], // Array to store fuel data fetched from the server
        };
    }

    componentDidMount() {
        // Fetch fuel data from server when component mounts
        axios.get("http://localhost:8080/show").then((response) => {
            this.setState({ fuelData: response.data });
        });
    }

    handledevice_nameChange = (event) => {
        this.setState({ device_name: event.target.value });
    };
    handleconnected = (event) => {
        this.setState({ connected: event.target.value });
    };
    handlestatus = (event) => {
        this.setState({ status: event.target.value });
    };
    handlepassword = (event) => {
        this.setState({ password: event.target.value });
    };
    handlelimited = (event) => {
        this.setState({ limited: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            id:this.state.id,
            device_name: this.state.device_name,
            connected: this.state.connected,
            status: this.state.status,
            password: this.state.password,
            limited: this.state.limited,
        };
        console.log(data);
        axios.post("http://localhost:8080/add", data).then((response) => {
            // Add new fuel data to the state and clear the form
            this.setState({
                fuelData: [...this.state.fuelData, response.data],
                id:"",
                device_name: "",
                connected: "",
                status: "",
                password: "",
                limited: "",
            });
        });
    };

    handleUpdate = (id, data) => {
        // Send PUT request to update fuel data with the given ID
        axios.put(`http://localhost:8080/update/${id}`, data).then((response) => {
            // Update the state to reflect the updated fuel data
            const updatedFuelData = this.state.fuelData.map((bluetooth) => {
                if (bluetooth.id === response.data.id) {
                    return response.data;
                } else {
                    return bluetooth;
                }
            });
            this.setState({ fuelData: updatedFuelData });
        });
    };

    handleDelete = (id) => {
        // Send DELETE request to remove fuel data with the given ID
        axios.delete(`http://localhost:8080/Delete/${id}`).then((response) => {
            // Update the state to remove the deleted fuel data
            const updatedFuelData = this.state.fuelData.filter(
                (bluetooth) => bluetooth.id !== id
            );
            this.setState({ fuelData: updatedFuelData });
        });
    };

    handleEdit = (data) => {
        this.setState({
            id: data.id,
            device_name: data.device_name,
            connected: data.connected,
            status: data.status,
            password: data.password,
            limited: data.limited,
            isEdit: true,
        });
        console.log(this.state.id);
    };

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value,
        });
    };


    handleUpdate = (event) => {
        event.preventDefault();
        const data = {
            id:this.state.id,
            device_name: this.state.device_name,
            connected: this.state.connected,
            status: this.state.status,
            password: this.state.password,
            limited: this.state.limited,
        };
        const id = this.state.id;
        axios
            .put(`http://localhost:8080/update/${id}`, data)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    id:"",
                    device_name: "",
                    connected: "",
                    status: "",
                    password: "",
                    limited:"",
                });
                this.props.history.push("/");
            })
            .catch((err) => console.log(err));
    };






    render() {
        return (

            <div>
                <form onSubmit={this.handleSubmit} className="fuel">
                <label className="login-label">id</label>
                    <input
                        className="fuel"
                        type="text"
                        value={this.state.id}
                        onChange={this.handleidChange}
                    />
                    <br /><br />
                    <label className="login-label">devicename</label>
                    <input
                        className="fuel"
                        type="text"
                        value={this.state.device_name}
                        onChange={this.handledevice_nameChange}
                    />
                    <br /><br />
                    <label className="login-label">connected</label>
                    <input
                        className="fuel"
                        type="text"
                        value={this.state.connected}
                        onChange={this.handleconnected}
                    />
                    <br /><br />

                    <label className="login-label">status</label>
                    <input
                        className="fuel"
                        type="number"
                        value={this.state.status}
                        onChange={this.handlestatus}
                    />
                    <br /><br />

                    <label className="login-label">password</label>
                    <input
                        className="fuel"
                        type="number"
                        value={this.state.password}
                        onChange={this.handlepassword}
                    />
                    <br /><br />

                    <label className="login-label">limited</label>
                    <input
                        className="fuel"
                        type="number"
                        value={this.state.limited}
                        onChange={this.handlelimited}
                    />
                    <br /><br />
                    <button className="submitt" type="submit" id="asd">
                        Submit
                    </button>
                    <br /><br />
                </form>

                <table className="output">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>device_name</th>
                            <th>connected</th>
                            <th>status</th>
                            <th>password</th>
                            <th>limited</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.fuelData.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.device_name}</td>
                                <td>{data.connected}</td>
                                <td>{data.status}</td>
                                <td>{data.password}</td>
                                <td>{data.limited}</td>
                                <td>
                                    <button onClick={() => this.handleEdit(data)}>Edit</button>
                                </td>

                                <td>
                                    <button
                                        onClick={() => this.handleDelete(data.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br><br></br><br></br><br></br>
                <form onSubmit={this.handleUpdate}>
                    <input type="hidden" name="id" value={this.state.id} />
                    <label>id:</label>
                    <input
                        type="text"
                        name="id"
                        value={this.state.id}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <label>Device Name:</label>
                    <input
                        type="text"
                        name="device_name"
                        value={this.state.device_name}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <label>Connected:</label>
                    <input
                        type="number"
                        name="connected"
                        value={this.state.connected}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <label>Status:</label>
                    <input
                        type="number"
                        name="status"
                        value={this.state.status}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <label>Password:</label>
                    <input
                        type="text"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <label>Limited:</label>
                    <input
                        type="number"
                        name="limited"
                        value={this.state.limited}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <button type="submit">Save</button>
                    <button onClick={this.handleCancel}>Cancel</button>
                </form>        </div>

        );
    }
}
export default Forms;