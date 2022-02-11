import React from "react";
import '../css/user.css';
import {API_URL} from "../../config";
import {Preloader} from "../layouts/Preloader";
import {RegisterForm} from "./RegisterForm";
import {LoginForm} from "./LoginForm";
import {Welcome} from "./Welcome";
import {EditForm} from "./EditForm";

export default class UserContainer extends React.Component {
    constructor(props) {
        super(props);
        let newUser = {
            name: "",
            email: "",
            password: "",
            password_confirm: "",
            lastName: "",
            secondName: "",
            male: "",
            birthDay: "",
            phone: "",
            language: "",
        };
        this.state = {
            session_id: null,
            session: [],
            error: null,
            isEdit: false,
            isReg: false,
            isLogin: false,
            isLoaded: false,
            user:  JSON.parse(localStorage.getItem("user")) === null
                ? newUser
                : JSON.parse(localStorage.getItem("user"))
        }
    }
    updateSessionActivity(){
        fetch(API_URL + "user/sessionUpdate",
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({_id: this.state.session_id})
            }
        )
            .then(response => {
                if (response.status !== 200) {
                    console.log("Error Session update");
                }
            })
            .catch(err => {
                this.setState({error: err});
            });
    }
    componentDidMount() {
        let s = window.localStorage.getItem("session_id");
        if (s) {
            this.setState({
                session_id: s,
                isLogin: true
            });
            this.UpInterval =
                setInterval(this.updateSessionActivity.bind(this),5000);
        }
    }
    create(){
        fetch(API_URL + "users",
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.user)
            }
        )
            .then(response => response.json())
            .then (item => {
                this.setState({
                    isReg: false,
                    user: null
                });
            })
            .catch(err => {
                this.setState({error: err});
            });
    }
    delete(){
        const user = this.state.user;

        fetch(API_URL + "users",
            {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            }
        )
            .then(response => {})
            .then (user => { this.setState({isLogin:false, isLoaded: true}) })
            .catch(err => {
                this.setState({error: err});
            });
    }
    doOpenRegForm(){
        let newUser = {
            name: "",
            email: "",
            password: "",
            password_confirm: ""
    }
        this.setState({
            isReg: true,
            user: newUser
        })
    }
    tryReg(){
         fetch(API_URL + "user/testbyemail/" + this.state.user.email)
            .then(response => response.text())
            .then (isHaving => {
                // console.log(isHaving);
                if(isHaving === "true") {
                    console.log("    ");
                } else {
                    console.log("     -      ");
                    this.create();
                }
            })

            .catch(err => {
                this.setState({error: err});
            });
    }
    doOpenLoginForm(){
        this.setState({
            isReg: false,
            isLoaded: true
        });
    }
    tryLogin(){
        fetch(API_URL + "user/trylogin/" + this.state.user.email + "/" + this.state.user.password)
            .then(response => response.json())
            .then (session => {console.log(session);
                if(session === false) {
                    this.setState({isLogin: false});
                    alert('Неправильный логин или пароль');
                    this.doOpenLoginForm()
                    } else {
                    this.setState({
                        session_id: session,
                        isLogin: true
                    })
                }
                window.localStorage.setItem("session_id", session);
                this.UpInterval = setInterval(this.updateSessionActivity.bind(this),10000);
                this.getSessionById();
             })
             .catch(err => {
                this.setState({error: err});
            });
    }
    getSessionById() {
        fetch(API_URL + "session/" + this.state.session_id)
            .then(response => response.json())
            .then (session => {
                console.log(session);
                this.setState({
                    session: session,
                })
                this.getOneUser();
            })
            .catch(err => {
                this.setState({error: err});
            });
    }
    getOneUser() {
        if(this.state.session.length > 0) {
        fetch(API_URL + "users/" + this.state.session[0].user_id)
            .then(response => response.json())
            .then (user => {
                this.setState({
                    user: user[0]})
                    console.log(user)
                    localStorage.setItem("user", JSON.stringify(this.state.user));
            }
            )
            .catch(err => {
                console.log(err);
            })}
    }

    doOpenEditForm(){
        // this.oldUser = this.state.user;
        // if (!this.state.user) {
        //     this.state.user = new Object();
        //     this.state.user.name = "";
        //     this.state.user.email = "";
        //     this.state.user.password = "";
        //     this.state.user.password_confirm = "";
        //     this.state.user.lastName = "";
        //     this.state.user.secondName = "";
        //     this.state.user.male = "";
        //     this.state.user.birthDay = "";
        //     this.state.user.phone = "";
        //     this.state.user.language = "";
        // }
        this.setState({isLogin: false, isEdit: true});
    }
    doCloseEditForm() {
        this.setState({isEdit: false, isLogin: true, user: this.state.user});
    }
    doSaveEditForm(){
            this.doUpdate();
            this.setState({
                isLogin: true,
                isEdit:false});
        localStorage.setItem("user", JSON.stringify(this.state.user));
   }
    doUpdate(){
        fetch(API_URL + "users",
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.user)
            }
        )
            .then(response => {})
            .then (user => { this.setState({isLogin: true}) })
            .catch(err => {
                this.setState({error: err});
            });
    }
    doLogout() {
         fetch(API_URL + "user/sessionDelete",
            {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({_id: this.state.session_id})
            }
        )
            .then(response => {
                if (response.status != 200) {
                    console.log("Error Session close");
                }else {
                    clearInterval( this.UpInterval );
                    this.setState({
                        session_id: null,
                        isLogin: false
                    })
                }
            })
            .catch(err => {
                this.setState({error: err});
            });
        localStorage.removeItem("session_id");
    }
    onChange(el){
        const user = this.state.user;
        user[el.target.name]= el.target.value;
        this.setState({user: user});
    }
    renderRegisterForm() {
        return (
        <RegisterForm
                change={this.onChange.bind(this)}
                doOpenLoginForm={this.doOpenLoginForm.bind(this)}
                tryReg={this.tryReg.bind(this)}
            />
        )
    }
    renderLoginForm() {
        return(
            <LoginForm
                change={this.onChange.bind(this)}
                doOpenRegForm={this.doOpenRegForm.bind(this)}
                tryLogin={this.tryLogin.bind(this)}
            />
        )
    }
    renderWelcome() {
        return(
            <Welcome
                user={this.state.user}
                session_id = {this.state.session_id}
                change={this.onChange.bind(this)}
                doOpenEditForm={this.doOpenEditForm.bind(this)}
                doLogout={this.doLogout.bind(this)}
                delete={this.delete.bind(this)}
                getOneUser={this.getOneUser.bind(this)}
            />
        )
    }
    renderEditForm() {
        return(
           <EditForm
               session_id = {this.state.session_id}
               user={this.state.user}
               change={this.onChange.bind(this)}
               doCloseEditForm={this.doCloseEditForm.bind(this)}
               doSaveEditForm={this.doSaveEditForm.bind(this)}
               getOneUser={this.getOneUser.bind(this)}
           />
        )
    }
    render(){
        if(this.state.error) return this.renderError();
        if(this.state.isReg) return this.renderRegisterForm();
        if(this.state.isEdit) return this.renderEditForm();
        if(this.state.isLogin) return this.renderWelcome();
        return this.renderLoginForm();
    }
    renderLoading(){
        return (
            <Preloader/>
        )
    }
    renderError(){
        return (
            console.log(this.state.error.message)
        );
    }
}