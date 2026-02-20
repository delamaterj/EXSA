import { useNavigate } from 'react-router-dom';

interface ButtonProp {

  title: string;
  disabled: boolean;
  url: string;

}

function Button({title, disabled, url}: ButtonProp){

    const navigate = useNavigate();

    function handleClickNav() {
        navigate(url);
    }

    function handleClick() {

    }

    if (title === "Facebook" || title === "Instagram") {
        return (
            <a href={url}><button disabled={disabled}>{title}</button></a>
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
