import React, { Component } from "react";
import UserItem from "./UserItem";
import { connect } from 'react-redux';

class Users extends Component {
  renderListUser = () => {
    let { listUser, keyword } = this.props;

    //filter lisUser by keyword
    listUser = listUser.filter((user) => user.fullname.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);

    return listUser?.map((user) => {
      return <UserItem key={user.id} user={user} />;
    })
  }
  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {this.renderListUser()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUser: state.userReducer.listUser,
    keyword: state.userReducer.keyword,
  }
}

export default connect(mapStateToProps, null)(Users);
