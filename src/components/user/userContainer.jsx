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
        this.UpInterval = null;
        this.lastUpdateTime = 0;
    }

    getInitialState = () => {
        const newUser = {
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

        const savedUser = localStorage.getItem("user");
        const savedSession = localStorage.getItem("session_id");

        return {
            session_id: savedSession || null,
            session: [],
            error: null,
            isEdit: false,
            isReg: false,
            isLogin: !!savedSession,
            isLoading: false,
            user: savedUser ? JSON.parse(savedUser) : newUser
        };
    };

    componentDidMount() {
        if (this.state.session_id) {
            this.initializeSession();
        }
    }

    componentWillUnmount() {
        this.clearInterval();
    }

    clearInterval = () => {
        if (this.UpInterval) {
            clearInterval(this.UpInterval);
            this.UpInterval = null;
        }
    };

    initializeSession = () => {
        this.setState({ isLoading: true });
        this.getSessionById()
            .finally(() => this.setState({ isLoading: false }));
        this.startSessionInterval();
    };

    startSessionInterval = () => {
        this.clearInterval();
        // Увеличиваем интервал до 30 секунд
        this.UpInterval = setInterval(this.updateSessionActivity, 30000);
    };

    // API Methods
    handleApiError = (error) => {
        console.error('API Error:', error);
        this.setState({ error, isLoading: false });
    };

    shouldUpdateSession = () => {
        const now = Date.now();
        // Проверяем, прошло ли достаточно времени с последнего обновления (минимум 25 секунд)
        if (now - this.lastUpdateTime < 25000) {
            return false;
        }
        this.lastUpdateTime = now;
        return true;
    };

    updateSessionActivity = async () => {
        if (!this.shouldUpdateSession()) return;

        try {
            const response = await fetch(`${API_URL}user/sessionUpdate`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: this.state.session_id })
            });

            if (!response.ok) {
                throw new Error('Session update failed');
            }
        } catch (error) {
            this.handleSessionError(error);
        }
    };

    handleSessionError = (error) => {
        this.clearInterval();
        localStorage.removeItem("session_id");
        localStorage.removeItem("user");
        this.setState({
            ...this.getInitialState(),
            error
        });
    };

    getSessionById = async () => {
        if (!this.state.session_id) return;

        try {
            const response = await fetch(`${API_URL}session/${this.state.session_id}`);
            if (!response.ok) throw new Error('Session fetch failed');

            const session = await response.json();
            this.setState({ session });

            if (session.length > 0 && (!this.state.user?.email || this.state.user?.email === '')) {
                await this.getOneUser(session[0].user_id);
            }
        } catch (error) {
            this.handleSessionError(error);
        }
    };

    getOneUser = async (userId) => {
        if (!userId) return;

        try {
            const response = await fetch(`${API_URL}users/${userId}`);
            if (!response.ok) throw new Error('User fetch failed');

            const users = await response.json();
            if (users && users.length > 0) {
                const currentUser = users[0];
                this.setState({ user: currentUser });
                localStorage.setItem("user", JSON.stringify(currentUser));
            }
        } catch (error) {
            this.handleApiError(error);
        }
    };

    handleUserLogin = async (credentials) => {
        this.setState({ isLoading: true });
        try {
            const response = await fetch(
                `${API_URL}user/trylogin/${credentials.email}/${credentials.password}`
            );
            if (!response.ok) throw new Error('Login failed');

            const session = await response.json();
            if (!session) {
                throw new Error('Invalid credentials');
            }

            localStorage.setItem("session_id", session);
            this.setState({
                session_id: session,
                isLogin: true,
                error: null
            });

            this.initializeSession();
        } catch (error) {
            this.handleApiError(error);
        } finally {
            this.setState({ isLoading: false });
        }
    };

    handleUserLogout = async () => {
        this.setState({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}user/sessionDelete`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: this.state.session_id })
            });

            if (!response.ok) throw new Error('Logout failed');

            this.clearInterval();
            localStorage.removeItem("session_id");
            localStorage.removeItem("user");

            this.setState(this.getInitialState());
        } catch (error) {
            this.handleApiError(error);
        }
    };

    handleUserUpdate = async (userData) => {
        if (!userData || !userData.email) return;

        this.setState({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}users`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (!response.ok) throw new Error('Update failed');

            this.setState({
                user: userData,
                isEdit: false,
                isLogin: true
            });

            localStorage.setItem("user", JSON.stringify(userData));
        } catch (error) {
            this.handleApiError(error);
        } finally {
            this.setState({ isLoading: false });
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }));
    };

    // Render Methods
    renderLoading = () => <Preloader />;

    renderError = () => (
        <div className="alert alert-danger" role="alert">
            {this.state.error?.message || 'An error occurred. Please try again.'}
        </div>
    );

    renderRegisterForm = () => (
        <RegisterForm
            change={this.handleChange}
            doOpenLoginForm={() => this.setState({ isReg: false })}
            tryReg={() => this.handleUserUpdate(this.state.user)}
        />
    );

    renderLoginForm = () => (
        <LoginForm
            change={this.handleChange}
            doOpenRegForm={() => this.setState({ isReg: true })}
            tryLogin={() => this.handleUserLogin(this.state.user)}
        />
    );

    renderWelcome = () => (
        <Welcome
            user={this.state.user}
            session_id={this.state.session_id}
            change={this.handleChange}
            doOpenEditForm={() => this.setState({ isLogin: false, isEdit: true })}
            doLogout={this.handleUserLogout}
            delete={this.handleUserLogout}
        />
    );

    renderEditForm = () => (
        <EditForm
            session_id={this.state.session_id}
            user={this.state.user}
            change={this.handleChange}
            doCloseEditForm={() => this.setState({ isEdit: false, isLogin: true })}
            doSaveEditForm={() => this.handleUserUpdate(this.state.user)}
        />
    );

    render() {
        const { error, isReg, isEdit, isLogin, isLoading } = this.state;

        if (isLoading) return this.renderLoading();
        if (error) return this.renderError();
        if (isReg) return this.renderRegisterForm();
        if (isEdit) return this.renderEditForm();
        if (isLogin) return this.renderWelcome();
        return this.renderLoginForm();
    }
}