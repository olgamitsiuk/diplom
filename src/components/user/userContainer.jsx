import React from "react";
import '../css/user.css';
import { API_URL } from "../../config";
import { Preloader } from "../layouts/Preloader";
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";
import { Welcome } from "./Welcome";
import { EditForm } from "./EditForm";

export default class UserContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.sessionCheckInterval = null;
    }

    getInitialState = () => {
        const emptyUser = {
            name: "",
            email: "",
            password: "",
            lastName: "",
            secondName: "",
            male: "",
            birthDay: "",
            phone: "",
            language: ""
        };

        return {
            currentUser: JSON.parse(localStorage.getItem("user")) || emptyUser,
            sessionId: localStorage.getItem("session_id") || null,
            error: null,
            view: localStorage.getItem("session_id") ? 'welcome' : 'login',
            isLoading: false
        };
    };

    // Lifecycle methods
    componentDidMount() {
        if (this.state.sessionId) {
            this.startSessionCheck();
        }
    }

    componentWillUnmount() {
        this.stopSessionCheck();
    }

    // Session management
    startSessionCheck = () => {
        this.stopSessionCheck();
        this.sessionCheckInterval = setInterval(this.checkSession, 30000);
    };

    stopSessionCheck = () => {
        if (this.sessionCheckInterval) {
            clearInterval(this.sessionCheckInterval);
            this.sessionCheckInterval = null;
        }
    };

    checkSession = async () => {
        try {
            const response = await this.makeRequest(
                'PUT',
                'user/sessionUpdate',
                { _id: this.state.sessionId }
            );

            if (!response.ok) {
                this.handleLogout();
            }
        } catch (error) {
            this.handleLogout();
        }
    };

    // API helpers
    makeRequest = async (method, endpoint, body = null) => {
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        return fetch(`${API_URL}${endpoint}`, options);
    };

    handleApiError = (error) => {
        console.error('API Error:', error);
        this.setState({
            error: error.message || 'An error occurred',
            isLoading: false
        });
    };

    // User actions
    handleLogin = async (credentials) => {
        this.setState({ isLoading: true });
        try {
            const response = await this.makeRequest(
                'GET',
                `user/trylogin/${credentials.email}/${credentials.password}`
            );
            const sessionId = await response.json();

            if (!sessionId) {
                throw new Error('Invalid credentials');
            }

            // Store session and start monitoring
            localStorage.setItem("session_id", sessionId);
            this.setState({
                sessionId,
                currentUser: credentials,
                view: 'welcome',
                error: null
            });

            // Get full user data
            await this.fetchUserData();
            this.startSessionCheck();

        } catch (error) {
            this.handleApiError(error);
        } finally {
            this.setState({ isLoading: false });
        }
    };

    handleLogout = async () => {
        this.setState({ isLoading: true });
        try {
            if (this.state.sessionId) {
                await this.makeRequest(
                    'DELETE',
                    'user/sessionDelete',
                    { _id: this.state.sessionId }
                );
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.stopSessionCheck();
            localStorage.removeItem("session_id");
            localStorage.removeItem("user");
            this.setState(this.getInitialState());
        }
    };

    handleRegistration = async (userData) => {
        this.setState({ isLoading: true });
        try {
            // Check if email exists
            const checkResponse = await this.makeRequest(
                'GET',
                `user/testbyemail/${userData.email}`
            );
            const emailExists = await checkResponse.text();

            if (emailExists === "true") {
                throw new Error('Email already exists');
            }

            // Create user
            const createResponse = await this.makeRequest(
                'POST',
                'users',
                userData
            );

            if (!createResponse.ok) {
                throw new Error('Registration failed');
            }

            this.setState({ view: 'login' });
            alert('Registration successful! Please log in.');

        } catch (error) {
            this.handleApiError(error);
        } finally {
            this.setState({ isLoading: false });
        }
    };

    handleUpdateUser = async (userData) => {
        this.setState({ isLoading: true });
        try {
            const response = await this.makeRequest(
                'PUT',
                'users',
                userData
            );

            if (!response.ok) {
                throw new Error('Update failed');
            }

            this.setState({
                currentUser: userData,
                view: 'welcome'
            });

            localStorage.setItem("user", JSON.stringify(userData));

        } catch (error) {
            this.handleApiError(error);
        } finally {
            this.setState({ isLoading: false });
        }
    };

    fetchUserData = async () => {
        try {
            const sessionResponse = await this.makeRequest(
                'GET',
                `session/${this.state.sessionId}`
            );
            const sessionData = await sessionResponse.json();

            if (sessionData.length > 0) {
                const userResponse = await this.makeRequest(
                    'GET',
                    `users/${sessionData[0].user_id}`
                );
                const userData = await userResponse.json();

                if (userData.length > 0) {
                    const currentUser = userData[0];
                    this.setState({ currentUser });
                    localStorage.setItem("user", JSON.stringify(currentUser));
                }
            }
        } catch (error) {
            this.handleApiError(error);
        }
    };

    // Form handling
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                [name]: value
            }
        }));
    };

    setView = (view) => {
        this.setState({ view });
    };

    // Render methods
    renderCurrentView = () => {
        const { view, currentUser, isLoading, error } = this.state;

        if (isLoading) return <Preloader />;
        if (error) return this.renderError();

        switch (view) {
            case 'register':
                return (
                    <RegisterForm
                        change={this.handleInputChange}
                        doOpenLoginForm={() => this.setView('login')}
                        tryReg={() => this.handleRegistration(currentUser)}
                    />
                );
            case 'login':
                return (
                    <LoginForm
                        change={this.handleInputChange}
                        doOpenRegForm={() => this.setView('register')}
                        tryLogin={() => this.handleLogin(currentUser)}
                    />
                );
            case 'edit':
                return (
                    <EditForm
                        user={currentUser}
                        change={this.handleInputChange}
                        doCloseEditForm={() => this.setView('welcome')}
                        doSaveEditForm={() => this.handleUpdateUser(currentUser)}
                    />
                );
            case 'welcome':
                return (
                    <Welcome
                        user={currentUser}
                        change={this.handleInputChange}
                        doOpenEditForm={() => this.setView('edit')}
                        doLogout={this.handleLogout}
                        delete={this.handleLogout}
                    />
                );
            default:
                return null;
        }
    };

    renderError = () => (
        <div className="alert alert-danger" role="alert">
            {this.state.error}
        </div>
    );

    render() {
        return this.renderCurrentView();
    }
}