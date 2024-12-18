import { useState, useRef, useEffect, useContext } from 'react';
import { styled } from 'styled-components';
import { Context } from '../App.jsx';

export function CountryDropdown({ value, onChange, required }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode] = useContext(Context);
  const dropdownRef = useRef(null);

  const countries = [
    { name: 'United States', code: 'US', flag: '🇺🇸' },
    { name: 'Canada', code: 'CA', flag: '🇨🇦' },
    { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
    { name: 'Australia', code: 'AU', flag: '🇦🇺' },
    { name: 'Germany', code: 'DE', flag: '🇩🇪' },
    { name: 'France', code: 'FR', flag: '🇫🇷' },
    { name: 'Spain', code: 'ES', flag: '🇪🇸' },
    { name: 'Italy', code: 'IT', flag: '🇮🇹' },
    { name: 'Japan', code: 'JP', flag: '🇯🇵' },
    { name: 'South Korea', code: 'KR', flag: '🇰🇷' },
    // Add more countries as needed
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (country) => {
    onChange(country.name);
    setIsOpen(false);
  };

  const selectedCountry = countries.find(country => country.name === value);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        required={required}
      >
        {selectedCountry ? (
          <>
            <span>{selectedCountry.flag}</span>
            <span>{selectedCountry.name}</span>
          </>
        ) : (
          <Placeholder>Select a country</Placeholder>
        )}
        <Arrow isOpen={isOpen}>▼</Arrow>
      </DropdownButton>

      {isOpen && (
        <DropdownList>
          {countries.map((country) => (
            <DropdownItem
              key={country.code}
              onClick={() => handleSelect(country)}
              selected={country.name === value}
            >
              <span>{country.flag}</span>
              <span>{country.name}</span>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.background};
  border: 1px solid ${({theme}) => theme.weakBorderColor};
  border-radius: 4px;
  color: ${({theme}) => theme.color};
  cursor: pointer;
  font-size: 14px;
  text-align: left;

  span {
    margin-right: 8px;
  }

  &:focus {
    outline: none;
    border-color: #0A65CC;
  }
`;

const Placeholder = styled.span`
  color: ${({theme}) => theme.secColor};
`;

const Arrow = styled.span`
  margin-left: auto;
  transition: transform 0.2s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  font-size: 10px;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background-color: ${({theme}) => theme.background};
  border: 1px solid ${({theme}) => theme.weakBorderColor};
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: ${props => props.selected ? '#0A65CC' : 'transparent'};
  color: ${({theme}) => theme.color};

  span {
    margin-right: 8px;
  }

  &:hover {
    background-color: ${props => props.selected ? '#0A65CC' : ({theme}) => theme.hoverColor};
  }
`;