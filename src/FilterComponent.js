import React, { useState } from 'react';
import styled from 'styled-components';

const FilterButton = styled.button`
  background-color: ${(props) => (props.active ? '#3498db' : '#ecf0f1')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: 1px solid #3498db;
  border-radius: 4px;
  padding: 8px 16px;
  margin-right: 8px;
  cursor: pointer;
  outline: none;
`;

const FilterComponent = ({selectedFilters, setSelectedFilters}) => {

  const toggleFilter = (value) => {
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  return (
    <div>
      <FilterButton
        active={selectedFilters.includes('Low')}
        onClick={() => toggleFilter('Low')}
      >
        Low
      </FilterButton>
      <FilterButton
        active={selectedFilters.includes('Moderate')}
        onClick={() => toggleFilter('Moderate')}
      >
        Moderate
      </FilterButton>
      <FilterButton
        active={selectedFilters.includes('High')}
        onClick={() => toggleFilter('High')}
      >
        High
      </FilterButton>
      <FilterButton
        active={selectedFilters.includes('Very High')}
        onClick={() => toggleFilter('Very High')}
      >
        Very High
      </FilterButton>
      <div>
        Selected Filters: {selectedFilters.join(', ')}
      </div>
    </div>
  );
};

export default FilterComponent;