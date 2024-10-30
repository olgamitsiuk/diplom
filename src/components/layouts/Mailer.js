import React, { Component } from 'react';
import { API_URL } from '../../config';
import '../css/mail.css';
import { Preloader } from "./Preloader";

export default class Mailer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: true,
			mailer_body: {
				mail: "",
			}
		}
	}
	onChange(el) {
		// this forms the system's immediate reaction to user input
		const mailer_body = this.state.mailer_body;
		mailer_body[el.target.name] = el.target.value;
		this.setState({ mailer_body });
	}
	send() {
		this.setState({ isLoaded: false })
		fetch(API_URL + 'sendmail/',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(this.state.mailer_body)
			}
		)
			.then(res => {
				console.log("Result:", res);
				return res.json();
			})
			.then(data => {
				console.log(data);
				this.setState({ isLoaded: true })
			})
			.catch(err => {
				this.setState({ error: err, isLoaded: true })
			})
		alert('Thank you for subscribing to our newsletter')
	}
	render() {
		if (this.state.error) return this.renderError();
		if (!this.state.isLoaded) return this.renderLoading();
		return this.renderData();
	}
	renderData() {
		return (
			<div className="mail">
				<h4>Subscribe <br /> to our newsletter:</h4>
				<input type="mail" name="mail" onChange={this.onChange.bind(this)} placeholder="Enter your e-mail" />
				<button onClick={this.send.bind(this)} className="btn">Subscribe</button>
			</div>
		);
	}
	renderLoading() {
		return (
			<Preloader />
		)
	}
	renderError() {
		return (
			<div className="alert alert-danger" role="alert">
				Error: {this.state.error.message}
			</div>
		);
	}
}