import { useState } from 'react'
import { styled } from 'styled-components'
import '../index.css'

import SearchLogo from '../assets/fi_search.svg'

export function SearchInbox(){
    return (
        <Search>
            <SLogo src={SearchLogo} alt="Logo" />
            <SearchInput placeholder='Job tittle, keyword, company'/>
        </Search>
    )   
}

const Search = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
    height: 100%;
    border: 0px solid lightgray;
    margin-left: 12px;
    border-radius: 5px;
`
const Dropdown = styled.select`
    border-radius: 5px;
    outline: none;
    border: none;
    border-right: 0.5px solid lightgrey;
    background-color: white;
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
    color: black
`