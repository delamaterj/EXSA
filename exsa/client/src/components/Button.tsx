import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface ButtonProp {

  title: string;
  disabled: boolean;
  url: string;

}

function Button({title, disabled, url}: ButtonProp){

    const navigate = useNavigate();
    function handleClickBack() {

        //navigate(-1);

    }

    function handleClickNav() {
        navigate(url);
    }

    function handleClick() {

    }

    if (title === "Go Back") {
        return (
            <button disabled={disabled} onClick={handleClickBack}>{title}</button>
        );
    }
    else if (url !== "") {
        return (
            <button disabled={disabled} onClick={handleClickNav}>{title}</button>
        );
    }
    else {
        return (
            <button disabled={disabled} onClick={handleClick}>{title}</button>
        );
    }
}

export default Button;
