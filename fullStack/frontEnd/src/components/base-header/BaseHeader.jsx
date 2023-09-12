import React from "react";

import { Header } from './components/header/Header';
 
// import { Basicheader } from './components/basic-header/Basic-header';
 


export class BaseHeader extends React.Component{
    constructor(props){
        super(props)
        this.user = props
    }
    render(){
        if (this.user == null){
            return(<Header />)
        }
        else{
            // return(<Basicheader  />)
            console.log('test')
        }
    }
}