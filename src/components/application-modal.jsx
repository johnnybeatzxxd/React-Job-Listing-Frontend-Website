import { styled } from 'styled-components'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { useContext } from 'react'
import { Context } from '../App.jsx'

export function ApplicationModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    const [isDarkMode, setIsDarkMode] = useContext(Context);
    return (
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
    background: white;
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
`

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid #E4E5E8;

    h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 500;
    }
`

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #7C8493;
`

const ModalBody = styled.div`
    padding: 24px;
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
    background-color: #ffffff;
    color: #18191c;
    border: 1px solid #E4E5E8;
    border-radius: 4px;
`

const TextEditor = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #E4E5E8;
    border-radius: 4px;
`

const EditorToolbar = styled.div`
    display: flex;
    gap: 8px;
    padding: 8px;
    border-bottom: 1px solid #E4E5E8;
`

const ToolbarButton = styled.button`
    background: none;
    border: none;
    padding: 4px 8px;
    cursor: pointer;
    color: #18191c;
    &:hover {
        background: #F1F2F4;
        border-radius: 4px;
    }
`

const TextArea = styled.textarea`
    background-color: white;
    min-height: 150px;
    padding: 12px;
    border: none;
    resize: vertical;
    color:#18191c;
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
    border: 1px solid #E4E5E8;
    color: #18191c;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    
    &:hover {
        background: #F1F2F4;
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
