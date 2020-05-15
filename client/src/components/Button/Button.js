import React from "react";
import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({type, title, onClick}) => {
    return(
        <button className={styles.button} type={type} onClick={onClick}>
            {title}
        </button>
    )
};

Button.propTypes = {
    type : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    onClick : PropTypes.func,
};

Button.defaultProps = {
    type : "button",
    title : "Button",
    onClick : () => console.log("Button clicked")
};

export default Button;