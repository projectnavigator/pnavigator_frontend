const FormRow = ({ type, name, labelText, defaultValue, onChange, id, required, style }) => {
    return (
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          className='form-input'
          defaultValue={defaultValue || ''}
          onChange={onChange}
          required={required}
          style={style}
        />
      </div>
    );
  };
  export default FormRow;