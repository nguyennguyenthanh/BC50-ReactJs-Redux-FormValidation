import React, { Component } from "react";
import { connect } from 'react-redux';
import { actSearchUser } from "../store/action";

class Search extends Component {
  handleOnchange = (event) => {
    this.props.getKeyword(event.target.value);
  }
  render() {
    return <input type="text" className="form-control mb-3 w-50" onChange={this.handleOnchange} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getKeyword: (keyword) => {
      dispatch(actSearchUser(keyword));
    }
  }
}

export default connect(null, mapDispatchToProps)(Search);
