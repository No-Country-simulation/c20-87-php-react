;'use client';
import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchComponentProps {
  placeholderText: string;
  width?: string;
}

const SearchComponent = ({ placeholderText, width = '100%' }: SearchComponentProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Input
      prefix={<SearchOutlined />}
      placeholder={placeholderText}
      value={searchTerm}
      onChange={handleInputChange}
      style={{ width }}
      className="outline-none"
    />
  );
};

export default SearchComponent;