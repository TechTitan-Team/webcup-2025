// components/InputField.jsx
import React from 'react';
import { iconShow, iconNotShow } from '../Icon/Icon';

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  error,
  name,
  showToggle,
  togglePassword,
  showPassword,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 text-xs mb-1 font-medium">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={showToggle ? (showPassword ? "text" : "password") : type}
          name={name}
          className={`bg-white border ${error ? 'border-red-400' : 'border-gray-200'} text-gray-700 ${icon ? 'pl-10' : 'pl-3'} py-2 px-3 w-full rounded-md focus:outline-none focus:border-gray-400 text-sm`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
        {showToggle && (
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={togglePassword}
          >
            {showPassword ? iconShow : iconNotShow}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
