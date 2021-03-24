import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from './button.module.scss';

const Button = (props) => (
  <div
    className={classNames(css.button, props.className)}
    onClick={props.handleButtonClick}
  >
      {props.buttonText}
  </div>
);

Button.propTypes = {
  buttonText: PropTypes.string,
  handleButtonClick: PropTypes.func,
};

Button.defaultProps = {
  buttonText: 'Click Me!',
  handleButtonClick: () => {},
};

export default Button;
