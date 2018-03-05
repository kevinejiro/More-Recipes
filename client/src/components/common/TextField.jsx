import React from 'react';
import PropTypes from 'prop-types';
/**
 *
 * @param {object} props
 * @returns {JSX} JSX element
 */
function TextField(props) {
  return (
    <div
      className={props.textFieldClass}
    >
      {props.icon &&
        <span
          className="input-group-addon"
        >
          <i
            aria-hidden="true"
            className={`fa fa-${props.icon}`}
          />
        </span>
      }
      <input
        autoComplete={props.autoComplete}
        className={
          props.errorMessage ?
            'form-control is-invalid' :
            'form-control'
        }
        id={props.field}
        maxLength={props.maxLength}
        name={props.field}
        onBlur={props.handleBlur}
        onChange={props.handleChange}
        placeholder={props.label}
        type={props.type}
        value={props.value}
      />
      {props.errorMessage &&
        <div className="invalid-feedback">
          {props.errorMessage}
        </div>
      }
    </div>
  );
}
TextField.defaultProps = {
  autoComplete: undefined,
  errorMessage: undefined,
  handleBlur: null,
  icon: undefined,
  maxLength: undefined,
  type: 'text'
};
TextField.propTypes = {
  autoComplete: PropTypes.string,
  errorMessage: PropTypes.string,
  field: PropTypes.string.isRequired,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.string,
  textFieldClass: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};
export default TextField;
