import React, {useState, useEffect} from 'react';
import "./style.scss";
import { useNavigate } from "react-router-dom";
import './style.scss';

const WelcomePage = () =>  {
    const navigate = useNavigate();

    const changeRoute = () =>{ 
        navigate(`/menu`);
    }
  return (
    <div className="welcome-page">
        <span className='title-of-page'>WELCOME</span>
        <div className='introduction'>
            <span className='title'>About Us</span>
            <span className='desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec leo in eros elementum aliquet. 
                Donec scelerisque consectetur purus, id tristique velit condimentum viverra. Morbi porta tellus ut ipsum bibendum finibus. 
                Ut hendrerit non sem eget fermentum. Ut tincidunt convallis venenatis. Nullam tincidunt ullamcorper condimentum at ultrices quam, id blandit orci.</span>
        </div>
        <button onClick={() => changeRoute()} className='meals-btn'>See our Meals</button>
    </div>
  );
}

export default WelcomePage;
