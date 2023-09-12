import React from "react";

// import { BaseHeader } from '../base-header/BaseHeader'

import DraconImg from '../../image/drakonEgor.png'
import logo from "../../image/logo.png"
import { Link, Navigate } from "react-router-dom";
// import { Link,  } from "react-router-dom";
import './autorization.css'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BaseUrl } from '../../App.js'
import { TestUrl } from "../../App.js";
import axios from "axios";


const validationSchema = Yup.object().shape({
    email: Yup.string().email('Неправильный формат email').required('Введите email'),
    password: Yup.string().required('Введите пароль'),
});

export class Autorization extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            redirectToMainPage: false
        }
    }

    onClickAutorization = (dates) => {
        // axios.post(BaseUrl+'api/login', dates).then(response => {
        axios.post(TestUrl+'users/autorization', dates).then(response => {
            if (response.status === 200){
                
                this.redirectToMain()
                console.log(this.state.redirectToMainPage)
            } else if (response.status === 400) {
                alert("Не правильный email или пароль");
            } else{
                console.log(response.status)
            }
        })
    }

    redirectToMain(){
        this.setState({redirectToMainPage: true})
    }

    

    render(){
        if (this.state.redirectToMainPage){
            return (<Navigate to='/'/>)
        }
        return(
            <>
                <div className="bg-autorization">
                    <img src={DraconImg} width="700px" alt=""  className="dragon-img-autorization"/>
                    <div className="bg-content-autorization">
                        <div className="content-autorization">
                            <b>ВОЙТИ</b>
                            
                            <Formik 
                                initialValues={{ email: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={this.onClickAutorization}
                            >
                                {({ touched, errors }) => {
                                    return(
                                        <Form>
                                        <div className="form-input-autorization">
                                            <Field type="email" name="email" placeholder="Введите email" />
                                            <ErrorMessage name="email" component="div" className="error-message" />
                                            <Field type="password" name="password" placeholder="Введите пароль" />
                                            <ErrorMessage name="password" component="div" className="error-message" />
                                        </div>
                                        <button type="submit" >ВОЙТИ</button>
                                    </Form>
                                    )
                                    
                                }}
                            </Formik>

                            <a href=""><span>ЗАБЫЛ ПАРОЛЬ</span></a><br />
                            <Link to="/registration" className="link-to-registration">ЗАРЕГИСТРИРОВАТЬСЯ</Link>
                            
                            <img src={logo} alt="" width="110px" className="logo-content-autorization" />
                        </div>
                        
                        
                    </div>
                </div>
            </>
        )
    }
}