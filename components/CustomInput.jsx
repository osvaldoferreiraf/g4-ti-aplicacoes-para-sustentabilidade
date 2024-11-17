import { useState } from "react";

const SimpleSelectInput = ({ options, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (option) => {
    setInputValue(option);
    setIsDropdownOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="select-input-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={toggleDropdown}
        placeholder={placeholder || "Selecione ou digite..."}
        className="select-input"
      />
      {isDropdownOpen && (
        <div className="dropdown-options">
          {options
            .filter((option) =>
              option.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((option, index) => (
              <div
                key={index}
                className="dropdown-option"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SimpleSelectInput;
