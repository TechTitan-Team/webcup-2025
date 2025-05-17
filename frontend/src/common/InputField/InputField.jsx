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
      <label className="block text-[#00C4A7] text-sm mb-1">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={showToggle ? (showPassword ? "text" : "password") : type}
          name={name}
          className={`bg-white/5 border ${error ? 'border-red-500' : 'border-gray-600'} text-gray-700 ${icon ? 'pl-10' : 'pl-4'} py-2 px-4 w-full rounded-md focus:outline-none focus:border-[#00C4A7]`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
        {showToggle && (
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-[#00C4A7] hover:text-teal-300"
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
