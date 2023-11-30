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

const CovidToggle = () => {
  const [covidStatus, setCovidStatus] = useState('Pre');

  const handleToggle = (status) => {
    setCovidStatus(status);
  };

  return (
    <div>
      <FilterButton active={covidStatus === 'Pre'} onClick={() => handleToggle('Pre')}>
        Pre COVID
      </FilterButton>
      <FilterButton active={covidStatus === 'Post'} onClick={() => handleToggle('Post')}>
        Post COVID
      </FilterButton>
      <p>Current COVID Status: {covidStatus}</p>
    </div>
  );
};

export default CovidToggle;