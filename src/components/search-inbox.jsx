import { useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { useContext } from 'react'
import { Context } from '../App.jsx'

import SearchLogo from '../assets/fi_search.svg'

export function SearchInbox(){
    const [isDarkMode, setIsDarkMode] = useContext(Context);
    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> 
        <Search>
            <SLogo src={SearchLogo} alt="Logo" />
            <SearchInput placeholder='Job tittle, keyword, company'/>
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
const Dropdown = styled.select`
    border-radius: 5px;
    outline: none;
    border: none;
    border-right: 0.5px solid lightgrey;
    background-color: ${({ theme }) => theme.background};
    color:black
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