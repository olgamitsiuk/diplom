import React from "react";
import { API_URL } from '../../config';
import '../css/telegram.css';
import Bot from '../img/bot.png';

export  default class TelegramBot extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            message: {
                body: "",
                name: "",
                tel: ""
            }
        }
    }
    onChange(el){
        const message = this.state.message;
        message[el.target.name]= el.target.value;
        this.setState({message: message});
    }
    send(){
        this.setState({isLoaded: false});
        fetch(API_URL + "sendTelegram",
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.message)
            })
            .then(res=> {
                console.log("Result: ");
                console.log(res);
                return res.json();
            })
            .then(data =>{
                console.log(data);
                this.setState({isLoaded: true});

            })
            .catch(err=>{
                this.setState({error: err, isLoaded: true});
            });
        alert('Спасибо что связались с нами')
    }
    render(){
        if(this.state.error) return this.renderError();
        if(!this.state.isLoaded) return this.renderLoading();
        return this.renderData();
    }
    renderData(){
        return (
            <div className="row telegram"  id='telegram'>
               <img src={Bot} alt="alt"/>
               <div className="telegram-body">
                   <h2 className="telegram-title" >Свяжитесь с нами</h2>
                   <form>
                        <input type="text" name="name"
                               onChange={this.onChange.bind(this) }
                               placeholder="Введите Ваше имя"
                               className="form-control"/>
                        <input type="text" name="tel"
                               onChange={this.onChange.bind(this) }
                               placeholder="Введите Ваш телефон"
                               className="form-control"/>
                        <textarea name="body"
                                  onChange={this.onChange.bind(this) }
                                  className="form-control"
                                  placeholder="Ваше сообщение" />
                        <div className='btn-div'>
                            <button type="button" onClick={this.send.bind(this) }
                                    className="btn">Отправить</button>
                        </div>
                    </form>
                </div>

              </div>
        );
    }
     renderLoading(){
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    renderError(){
        return (
            <div className="alert alert-danger" role="alert">
                Error: {this.state.error.message}
            </div>
        );
    }
}