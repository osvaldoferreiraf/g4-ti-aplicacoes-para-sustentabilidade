import { useState } from "react";

const SimpleSelectInput = ({ options, placeholder, value, onChange, onClear }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="select-input-container">
      <div className="select-input-wrapper">
        <input
          type="text"
          value={value}
          onClick={toggleDropdown}
          placeholder={placeholder || "Selecione..."}
          className="select-input"
          readOnly
        />
        {value && (
          <button
            type="button"
            className="clear-button"
            onClick={onClear}
            aria-label="Limpar filtro"
          >
            ✕
          </button>
        )}
      </div>
      {isDropdownOpen && (
        <div className="dropdown-options">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleSelect(option)}
            >
              {option || "Todos"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleSelectInput;
