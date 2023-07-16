import React, { Component } from "react";
import { connect } from 'react-redux';
import { actSubmitUser } from "../store/action";
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        id: "",
        fullname: "",
        username: "",
        email: "",
        phoneNumber: "",
        type: "USER",
      },
      errors: {
        id: "",
        fullname: "",
        username: "",
        email: "",
        phoneNumber: "",
        type: "USER",
      },
      usernameValid: false,
      fullnameValid: false,
      emailValid: false,
      phoneNumberValid: false,
      typeValid: false,
      formValid: false,
    };
    //DOM tới thẻ cần
    this.closeModal = React.createRef();
  }

  handleOnchange = (event) => {
    const { name, value } = event.target;
    this.setState({
      values: { ...this.state.values, [name]: value },
    });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitUser(this.state.values);
    //close modal
    this.closeModal.current.click();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.userEdit) {
      this.setState({
        values: {
          id: nextProps.userEdit.id,
          fullname: nextProps.userEdit.fullname,
          username: nextProps.userEdit.username,
          email: nextProps.userEdit.email,
          phoneNumber: nextProps.userEdit.phoneNumber,
          type: nextProps.userEdit.type,
        }

      })
    } else {
      //reset state
      this.setState({
        values: {
          id: "",
          fullname: "",
          username: "",
          email: "",
          phoneNumber: "",
          type: "USER",
        }
      })
    }
  }

  handleValidation = (event) => {
    const { name, value } = event.target;
    let mess = value.trim() ? "" : `${name} không được rỗng`;

    let { usernameValid, fullnameValid, emailValid, phoneNumberValid } = this.state;

    switch (name) {
      case "username":
        usernameValid = mess === "" ? true : false;
        if (value && value.trim().length < 4) {
          mess = "Vui lòng nhập từ 4 kí tự trở lên";
          usernameValid = false;
        }
        break;
      case "fullname":
        fullnameValid = mess === "" ? true : false;
        break;
      case "email":
        emailValid = mess === "" ? true : false;
        if (value && !value.match("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")) {
          mess = "Vui lòng nhập đúng cú pháp mail";
          emailValid = false;
        }
        break;
      case "phoneNumber":
        phoneNumberValid = mess === "" ? true : false;
        break;

      default:
        break;
    }
    //Update again state.erros
    this.setState({
      errors: { ...this.state.errors, [name]: mess },
      usernameValid,
      fullnameValid,
      emailValid,
      phoneNumberValid,
      formValid: usernameValid && fullnameValid && emailValid && phoneNumberValid,
    })
  }

  render() {
    return (
      <div
        className="modal fade"
        id="modelIdUser"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.userEdit ? "EDIT USER" : "ADD USER"}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                ref={this.closeModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" name="username" onChange={this.handleOnchange} value={this.state.values.username} onBlur={this.handleValidation} />
                  {this.state.errors.username && (<div className="text-danger">{this.state.errors.username}</div>)}
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" name="fullname" onChange={this.handleOnchange} value={this.state.values.fullname} onBlur={this.handleValidation} />
                  {this.state.errors.fullname && (<div className="text-danger">{this.state.errors.fullname}</div>)}
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="text" className="form-control" name="email" onChange={this.handleOnchange} value={this.state.values.email} onBlur={this.handleValidation} />
                  {this.state.errors.email && (<div className="text-danger">{this.state.errors.email}</div>)}
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" className="form-control" name="phoneNumber" onChange={this.handleOnchange} value={this.state.values.phoneNumber} onBlur={this.handleValidation} />
                  {this.state.errors.phoneNumber && (<div className="text-danger">{this.state.errors.phoneNumber}</div>)}
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select className="form-control" name="type" onChange={this.handleOnchange} value={this.state.values.type} onBlur={this.handleValidation}>
                    <option>USER</option>
                    <option>VIP</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success" disabled={!this.state.formValid}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userEdit: state.userReducer.userEdit,
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    submitUser: (user) => {
      dispatch(actSubmitUser(user));
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(Modal);
