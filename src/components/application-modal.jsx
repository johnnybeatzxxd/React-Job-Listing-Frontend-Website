import { styled, ThemeProvider } from 'styled-components'
import { useContext, useState } from 'react'
import { Context } from '../App.jsx'
import { lightTheme, darkTheme } from '../utils/theme.js'
import { applyJob } from '../utils/job-requests.js';
import { toast } from 'react-hot-toast';

export function ApplicationModal({ isOpen, onClose,profile,jobData }) {
    const [isDarkMode] = useContext(Context)
    const [resume, setResume] = useState('')
    const [application, setApplication] = useState('')

    const formatApplicationData = (data) => ({
        jobId: jobData.job_id,
        userId: profile.user_id,
        application: application,
        resume: resume
    })

    if (!isOpen) return null

    const onApply = async () => {
        if (application === ''){
            toast.error("The cover letter is empty.")
        }else{
        try {
            const applicationData = formatApplicationData()
            await applyJob(applicationData)
            toast.success("Application submitted.")
            onClose() 
        } catch (error) {
            console.error('Failed to submit application:', error)
            toast.error("Failed to submit application")

        }
    }
}

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>
                        <h2>Submit Application</h2>
                        <CloseButton onClick={onClose}>&times;</CloseButton>
                    </ModalHeader>

                    <JobSummary>
                        <CompanyLogo>
                            {jobData.company.profile_image ? (
                                <img 
                                    src={jobData.company.profile_image} 
                                    alt={jobData.company.name}
                                    style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}}
                                />
                            ) : (
                                <img src={BriefCase} alt="" />
                            )}
                        </CompanyLogo>
                        <CompanyInfo>
                            <h3>{jobData.jobTitle}</h3>
                            <p>{jobData.company.name}</p>
                        </CompanyInfo>
                    </JobSummary>

                    <FormSection>
                        <InputGroup>
                            <label>Choose Resume</label>
                            <Select value={resume} onChange={(e) => setResume(e.target.value)}>
                                <option value="">Select...</option>
                            </Select>
                        </InputGroup>

                        <InputGroup>
                            <label>Cover Letter</label>
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
                                    value={application}
                                    onChange={(e) => setApplication(e.target.value)}
                                    placeholder="Write down your biography here. Let the employers know who you are..."
                                />
                            </TextEditor>
                        </InputGroup>
                    </FormSection>

                    <ButtonGroup>
                        <Button onClick={onClose} className="cancel">Cancel</Button>
                        <Button onClick={onApply} className="submit">
                            Apply Now
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Button>
                    </ButtonGroup>
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
    position: relative;
    background: ${({ theme }) => theme.background};
    padding: 32px;
    border-radius: 12px;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.weakBorderColor};

    h2 {
        font-size: 24px;
        color: ${({ theme }) => theme.lightblueText};
        margin: 0;
    }
`

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: ${({theme})=>theme.color};
`

const JobSummary = styled.div`
    display: flex;
    gap: 16px;
    padding: 16px;
    background: ${({ theme }) => theme.secBackground};
    border-radius: 8px;
    margin-bottom: 24px;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        align-items: center;
    }
`

const CompanyLogo = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;  // Prevents the logo from shrinking

    @media (max-width: 768px) {
        width: 80px;
        height: 80px;
    }
`

const CompanyInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    h3 {
        font-size: 18px;
        color: ${({ theme }) => theme.lightblueText};
        margin: 0;
    }

    p {
        color: ${({ theme }) => theme.secColor};
        font-size: 14px;
    }
`

const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.lightblueText};
    }

    input, textarea {
        padding: 12px;
        border: 1px solid ${({ theme }) => theme.weakBorderColor};
        border-radius: 6px;
        background: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.color};
        font-size: 14px;

        &:focus {
            outline: none;
            border-color: #0B65C6;
        }
    }

    textarea {
        min-height: 120px;
        resize: vertical;
    }
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
    gap: 16px;
    margin-top: 24px;
`

const Button = styled.button`
    padding: 12px 24px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;

    &.cancel {
        background: transparent;
        border: 1px solid ${({ theme }) => theme.weakBorderColor};
        color: ${({ theme }) => theme.secColor};

        &:hover {
            background: ${({ theme }) => theme.secBackground};
        }
    }

    &.submit {
        background: #0B65C6;
        border: none;
        color: white;

        &:hover {
            background: #0952a5;
        }

        svg {
            margin-left: 4px;
        }
    }
`

