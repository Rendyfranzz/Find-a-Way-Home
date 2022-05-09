const Input = ({ value, onChange }) => {
  return (
    <input
      type='text'
      name='mouse-col'
      id='mouse-col'
      autoComplete='off'
      value={value}
      onChange={onChange}
      className={`block w-full px-3 py-1 border-lightblue-300 border-2 rounded-md shadow-sm sm:text-sm focus:ring-lightblue-500 focus:border-lightblue-500`}
    />
  );
};

export default Input;
