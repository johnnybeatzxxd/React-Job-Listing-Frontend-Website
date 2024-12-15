import { styled, ThemeProvider } from 'styled-components'
import { useContext } from 'react'
import { Context } from '../App.jsx'
import { lightTheme, darkTheme } from '../utils/theme.js'

export function ApplicationModal({ isOpen, onClose }) {
    const [isDarkMode] = useContext(Context)

    if (!isOpen) return null

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>
                        <h3>Apply Job: Senior UX Designer</h3>
                        <CloseButton onClick={onClose}>×</CloseButton>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label>Choose Resume</Label>
                            <Select>
                                <option value="">Select...</option>
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Cover Letter</Label>
                            <TextEditor>
                                <EditorToolbar>
                                    <ToolbarButton>B</ToolbarButton>
                                    <ToolbarButton>I</ToolbarButton>
                                    <ToolbarButton>U</ToolbarButton>
                                    <ToolbarButton>S</ToolbarButton>
                                    <ToolbarButton>🔗</ToolbarButton>
                                    <ToolbarButton>≡</ToolbarButton>
                                    <ToolbarButton>⋮</ToolbarButton>
                                </EditorToolbar>
                                <TextArea 
                                    placeholder="Write down your biography here. Let the employers know who you are..."
                                />
                            </TextEditor>
                        </FormGroup>

                        <ButtonGroup>
                            <CancelButton onClick={onClose}>Cancel</CancelButton>
                            <ApplyButton>
                                Apply Now
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </ApplyButton>
                        </ButtonGroup>
                    </ModalBody>
                </ModalContent>
            </ModalOverlay>
        </ThemeProvider>
    )
}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

const ModalContent = styled.div`
    background: ${({theme})=>theme.background};
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
`

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid ${({theme})=>theme.weakBorderColor};

    h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 500;
        color: ${({theme})=>theme.color};
    }
`

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: ${({theme})=>theme.color};
`

const ModalBody = styled.div`
    padding: 24px;
    color: ${({theme})=>theme.color};
`

const FormGroup = styled.div`
    margin-bottom: 20px;
`

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
`

const Select = styled.select`
    width: 100%;
    padding: 8px;
    background-color: ${({theme})=>theme.background};
    color: ${({theme})=>theme.color};
    border: 1px solid ${({theme})=>theme.weakBorderColor};
    border-radius: 4px;
`

const TextEditor = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${({theme})=>theme.weakBorderColor};
    border-radius: 4px;
`

const EditorToolbar = styled.div`
    display: flex;
    gap: 8px;
    padding: 8px;
    border-bottom: 1px solid ${({theme})=>theme.weakBorderColor};
`

const ToolbarButton = styled.button`
    background: none;
    border: none;
    padding: 4px 8px;
    cursor: pointer;
    color: ${({theme})=>theme.secColor};
    &:hover {
        background: ${({theme})=>theme.secBackground};
        border-radius: 4px;
    }
`

const TextArea = styled.textarea`
    background-color: ${({theme})=>theme.background};
    min-height: 150px;
    padding: 12px;
    border: none;
    resize: vertical;
    color:${({theme})=>theme.color};
    &:focus {
        outline: none;
    }
`

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
`

const CancelButton = styled.button`
    padding: 8px 16px;
    border: 1px solid ${({theme})=>theme.weakBorderColor};
    color: ${({theme})=>theme.color};
    border-radius: 6px;
    background: ${({theme})=>theme.background};
    cursor: pointer;
    
    &:hover {
        background: ${({theme})=>theme.secBackground};
    }
`

const ApplyButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #0B65C6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    
    &:hover {
        background: #0952a5;
    }
`
