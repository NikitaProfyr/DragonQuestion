import React from "react";
import DraconImg from '../../image/drakonEgor.png'
import logo from "../../image/logo.png"
import { Link, redirect, Navigate } from "react-router-dom";

import './registration.css'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BaseUrl } from '../../App.js'
import axios from "axios";
 

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Неправильный формат email').required('Введите email'),
    password1: Yup.string().required('Введите пароль'),
    password2: Yup.string()
      .oneOf([Yup.ref('password1'), null], 'Пароли должны совпадать')
      .required('Повторите пароль')
  });


export class Registration extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            redirgoToMainPageect: false
        }
    }

    onClickRegistration = (dates) => {
        console.log(dates)
         axios.post(BaseUrl+'api/users', dates).then(response => {
            if (response.status === 201){
                console.log(response.status)
                this.redirectToMain()
            } 
            else{
                console.log(response.status)
            }
         })
    }

    redirectToMain() {
        this.setState({redirectToMain: true})
    }

    render(){
        if (this.state.redirectToMain) {
            return (<Navigate to='/'/>) 
        }
        return(
            <>
               
                <div className="bg-registration">
                    <img src={DraconImg} width="700px" alt=""  className="dragon-img-registration"/>
                    <div className="bg-content-registration">
                        <div className="content-registration">
                            <b>РЕГИСТРАЦИЯ</b>
                            <Formik
                          initialValues={{ email: '', password1: '', password2: '' }}
                          validationSchema={validationSchema}
                          onSubmit={this.onClickRegistration}
                        >
                          {({ touched, errors }) => (
                            <Form>
                              <div className="form-input-registration">
                                <Field type="email" name="email" placeholder="Введите email" />
                                <ErrorMessage name="email" component="div" className="error-message" />
                                <Field type="password" name="password1" placeholder="Введите пароль" />
                                <ErrorMessage name="password1" component="div" className="error-message" />
                                <Field type="password" name="password2" placeholder="Повторите пароль" />
                                <ErrorMessage name="password2" component="div" className="error-message" />
                                <div className="checkbox-tumpler">
                                  <div className="checkbox-user">Пользователь</div>
                                  <div className="checkbox-creater">Автор</div>
                                </div>
                              </div>
                              <button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</button>
                            </Form>
                          )}
                        </Formik>
                            <Link to="/authorization">ВОЙТИ В АККАУНТ</Link>
                            
                            <img src={logo} alt="" width="110px" className="logo-content-registration" />
                        </div>
                        
                        
                    </div>
                </div>
            </>
        )
    }
}