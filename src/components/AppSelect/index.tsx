import React, { useState } from "react";
import { Dropdown, Form, InputGroup } from "react-bootstrap";
type TOption = {
  label: string;
  value: string;
};
type TAppSelect = {
  data: TOption[];
  onChange: (value: string) => void;
  placeholder: string;
  isInValid?: boolean;
};
const AppSelect = ({ data, onChange, placeholder, isInValid }: TAppSelect) => {
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState(data);
  const [openDropdown, setOpenDropdown] = useState(false);
  const handleSearch = (e: React.ChangeEvent<{ value: string }>) => {
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
  };

  return (
    <div className="position-relative">
      <InputGroup>
        <Form.Control
          type="text"
          className=""
          placeholder={placeholder}
          value={search}
          onChange={handleSearch}
          onFocus={() => {
            setOpenDropdown(true);
          }}
          style={{ borderColor: isInValid ? "red" : "#ebedef" }}
        />
        <button
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
        <div className="position-absolute z-3 bg-white shadow w-100 mt-1">
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
    </div>
  );
};

export default AppSelect;
