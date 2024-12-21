import { useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { useContext } from 'react'
import { Context } from '../App.jsx'
import SearchLogo from '../assets/fi_search.svg'

export function SearchInbox({ onSearchChange }){
    const [isDarkMode] = useContext(Context);
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        if (onSearchChange) {
            onSearchChange(e.target.value);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        const params = new URLSearchParams(window.location.search);
        const countryCode = params.get('country') || 'ALL';
        window.location.href = `find-jobs?country=${countryCode}&query=${encodeURIComponent(searchQuery)}`;
    };

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> 
        <Search>
            <SLogo src={SearchLogo} alt="Logo" onClick={handleSearch} style={{ cursor: 'pointer' }} />
            <SearchInput 
                placeholder='Job title, keyword, company'
                value={searchQuery}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            />
        </Search>
        </ThemeProvider>
    )   
}

const Search = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
    height: 100%;
    color:${({ theme }) => theme.color};
    margin-left: 12px;
    border-radius: 5px;
`
const SLogo = styled.img`
    margin-left: 15px;
    height: 20px;
    width: 20px;
`
const SearchInput = styled.input`
    width:80%;
    margin-left: 15px;
    background-color: transparent;
    border:none;
    outline: none;
    color: ${({ theme }) => theme.color}
`