import React, { useState, useRef, useEffect } from "react";
import { Dropdown, Form, InputGroup } from "react-bootstrap";

type TOption = {
  label: string;
  value: string;
};

type TAppSelect = {
  data: TOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder: string;
  isInValid?: boolean;
  disabled?: boolean;
  errorText?: string;
};

const AppSelect = ({
  data,
  onChange,
  placeholder,
  isInValid,
  value,
  disabled,
  errorText,
}: TAppSelect) => {
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState(data);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    // Attach event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    // Custom filtering logic
    const filtered = data.filter((item) =>
      item.label.toLowerCase().includes(searchTerm)
    );
    setFilterData(filtered);
  };

  const handleSelect = (value: string, label: string) => {
    setSearch(label); // Clear the search after selection
    setFilterData(data); // Reset the options
    onChange(value);
    setOpenDropdown(false); // Close the dropdown after selection
  };

  useEffect(() => {
    value &&
      setSearch(filterData?.find((item) => item.value === value)?.label ?? "");
  }, [value]);

  useEffect(() => {
    setFilterData(data);
  }, [data]);
  return (
    <div className="position-relative" ref={dropdownRef}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={handleSearch}
          onFocus={() => {
            setOpenDropdown(true);
          }}
          className="input-placeholder"
          disabled={disabled}
          style={{ borderColor: isInValid ? "red" : "#ebedef" }}
        />
        <button
          disabled={disabled}
          onClick={() => {
            setOpenDropdown(!openDropdown);
          }}
          className="btn border bg-gray-200"
          id="basic-addon2"
        >
          <i className="ti ti-chevron-down" />
        </button>
      </InputGroup>

      {openDropdown && (
        <div className="position-absolute z-3 bg-white shadow w-100">
          {filterData.length ? (
            <div className="overflow-y-auto" style={{ maxHeight: 300 }}>
              {filterData.map((item, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleSelect(item.value, item.label)}
                >
                  {item.label}
                </Dropdown.Item>
              ))}
            </div>
          ) : (
            <Dropdown.Item disabled>Không có thông tin</Dropdown.Item>
          )}
        </div>
      )}
      {errorText && (
        <p
          style={{ fontSize: 12, color: "red", marginTop: 4, fontWeight: 380 }}
        >
          {errorText}
        </p>
      )}
    </div>
  );
};

export default AppSelect;
