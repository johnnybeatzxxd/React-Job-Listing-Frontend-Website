import { useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import LogoImage from '../assets/Logo.svg'
import SearchLogo from '../assets/fi_search.svg'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { useContext } from 'react'
import { Context } from '../App.jsx'

export function Location({ onCountrySelect }) {
    const [isDarkMode] = useContext(Context);
    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> 
            <CountryDropdown onCountrySelect={onCountrySelect} />
        </ThemeProvider>
    )
}

const Dropdown = styled.select`
    border-radius: 5px;
    outline: none;
    border: none;
    border-right: 0.0px solid lightgrey;
    background-color: ${({ theme }) => theme.background};
    color:${({ theme }) => theme.color}
`
const CountryDropdown = ({ onCountrySelect }) => {
    const countries = [
        { name: 'All Countries', code: 'ALL', flag: '🌍' },
        { name: 'United States', code: 'US', flag: '🇺🇸' },
        { name: 'Canada', code: 'CA', flag: '🇨🇦' },
        { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
        { name: 'Australia', code: 'AU', flag: '🇦🇺'},
        { name: 'Ethiopia', code: 'ETH', flag: '🇪🇹'},
        { name: 'Germany', code: 'DE', flag: '🇩🇪' },
        { name: 'France', code: 'FR', flag: '🇫🇷' },
    ];

    // Find initial country based on URL parameter
    const getInitialCountry = () => {
        const params = new URLSearchParams(window.location.search);
        const countryCode = params.get('country') || 'ALL';
        return countries.find(c => c.code === countryCode) || countries[0];
    };

    const [selectedCountry, setSelectedCountry] = useState(getInitialCountry());

    const handleChange = (e) => {
        const newCountry = countries[e.target.value];
        setSelectedCountry(newCountry);
        onCountrySelect(newCountry);
    };

    return (
        <Dropdown value={countries.findIndex(c => c.code === selectedCountry.code)} onChange={handleChange}>
            {countries.map((country, index) => (
                <option key={country.code} value={index}>
                    {country.flag} {country.name}
                </option>
            ))}
        </Dropdown>
    );
};