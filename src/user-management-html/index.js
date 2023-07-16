import React, { Component } from "react";
import Search from "./Search";
import Users from "./Users";
import Modal from "./Modal";
import { connect } from 'react-redux';
import { actEditUser } from "../store/action";


class Home extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="display-4 text-center my-3">User Management</h1>
        <div className="d-flex justify-content-between align-items-center">
          <Search />
          <button
            className="btn btn-success"
            data-toggle="modal"
            data-target="#modelIdUser"
            onClick={() => {
              this.props.resetUserEdit();
            }}
          >
            Add User
          </button>
        </div>
        <Users />
        <Modal />
      </div>
    );
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    resetUserEdit: () => {
      dispatch(actEditUser());
    }
  }
}
export default connect(null, mapDispathToProps)(Home);
