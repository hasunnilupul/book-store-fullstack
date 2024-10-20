import PropTypes from "prop-types";

const InputField = ({
  id = "input-field",
  name = "input-field",
  type = "text",
  autoComplete = "",
  className = "",
  ...rest
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${className}`}
      {...rest}
    />
  );
};

// prop types definition
InputField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
};

export default InputField;
