import Select from "react-select";

const SearchableDropdown = ({
  defaultValue,
  onChange,
  options,
  isMulti,
  customStyles,
  value,
  isDisabled,
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      isMulti={isMulti}
      value={value}
      styles={customStyles}
      isDisabled={isDisabled}
    />
  );
};

export default SearchableDropdown;
