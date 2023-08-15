import React from "react";
import DraconImg from '../../image/drakonEgor.png'
import './home-page.css'


export class HomePage extends React.Component{
    render(){
        return(
            <>
                <div className="bg-content-block-1">
                    <div className="wrapper">
                        <div className="content-block-1">
                            <div className="text-content-block-1">
                                <p>Присоединяйтесь к нам сегодня и сделайте свой голос услышаным!<a href="">Зарегистрируйтесь</a> на нашем сайте, чтобы начать создавать и участвовать в опросах уже сейчас.</p>
                                <div className="h2-text-content-block-1">
                                    <h2><span className="DQtext"><b>DQ</b></span> - by IBD</h2><h2>company.</h2>
                                </div>           
                            </div>
                            <div className="image-content-block-1">
                                <img className="image-dragon-content-block-1" src={DraconImg} alt="" />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </>
        )
    }
}