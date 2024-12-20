import { useState, useContext, useEffect } from 'react';
import { styled, ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { Context } from '../App.jsx';
import { toast } from 'react-hot-toast';
import { FourSquare } from "react-loading-indicators";

import MoonIcon from '../assets/moon.svg';
import SunIcon from '../assets/sun.svg';
import LogoImage from '../assets/Logo.svg';
import LogoDark from '../assets/Logo-dark.svg';
import { postJob } from '../utils/job-requests.js'

export function PostJob() {
  const [isDarkMode, setIsDarkMode, profile, user] = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [jobTags, setJobTags] = useState(['']);

  // Redirect if no profile
  useEffect(() => {
    if (!profile) {
      window.location.href = "/signin";
    }
  }, [profile]);


  const [formData, setFormData] = useState({
    companyId: '',  
    jobTitle: '',
    country: '',    
    jobType: '',
    salaryType: '',
    professionLevel: '',
    estimatedBudget: '',
    maxApplicants: '',
    jobDescription: '',
    salary: '',
    tags: [],
    requirements: [''],
    desirables: ['']
  });


  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        companyId: profile.email || '',
        country: profile.country || ''
      }));
    }
  }, [profile]);
  const salaryTypeOptions = ['Fixed', 'Hourly'];
  const professionLevelOptions = [
    'Entry',
    'Intermediate', 
    'Senior',
    'Lead',
    'Expert'
  ];
  const jobTypeOptions = [
    'Remote',
    'On-site',
    'Hybrid'
  ];
  const tags = [
    'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++',
    'TypeScript', 'PHP', 'Ruby', 'Swift', 'Go', 'Rust',
    'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'estimatedBudget' || name === 'maxApplicants' || name === 'salary') {
      if (parseInt(value) < 1) return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleListChange = (index, value, listType) => {
    if (listType === 'requirements') {
      const newRequirements = [...formData.requirements];
      newRequirements[index] = value;
      setFormData(prev => ({
        ...prev,
        requirements: newRequirements
      }));
    } else if (listType === 'desirables') {
      const newDesirables = [...formData.desirables];
      newDesirables[index] = value;
      setFormData(prev => ({
        ...prev,
        desirables: newDesirables
      }));
    } else if (listType === 'jobTags') {
      const newTags = [...jobTags];
      newTags[index] = value;
      setJobTags(newTags);
    }
  };

  const addListItem = (listType) => {
    if (listType === 'requirements') {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, '']
      }));
    } else if (listType === 'desirables') {
      setFormData(prev => ({
        ...prev,
        desirables: [...prev.desirables, '']
      }));
    } else if (listType === 'jobTags') {
      setJobTags([...jobTags, '']);
    }
  };

  const removeListItem = (index, listType) => {
    if (listType === 'requirements') {
      const newRequirements = formData.requirements.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        requirements: newRequirements
      }));
    } else if (listType === 'desirables') {
      const newDesirables = formData.desirables.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        desirables: newDesirables
      }));
    } else if (listType === 'jobTags') {
      const newTags = jobTags.filter((_, i) => i !== index);
      setJobTags(newTags);
    }
  };

  const handleSkillChange = (tag) => {
    setFormData(prev => {
      if (prev.tags.includes(tag)) {
        return {
          ...prev,
          tags: prev.tags.filter(s => s !== tag)
        };
      }

      if (prev.tags.length < 5) {
        return {
          ...prev,
          tags: [...prev.tags, tag]
        };
      }
      toast.error('Maximum 5 tags allowed');
      return prev;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.jobTitle.trim()) {
      return toast.error('Job title is required');
    }
    if (!formData.salaryType) {
      return toast.error('Salary type is required');
    }
    if (!formData.professionLevel) {
      return toast.error('Profession level is required');
    }
    if (!formData.estimatedBudget || parseInt(formData.estimatedBudget) < 1) {
      return toast.error('Valid estimated budget is required');
    }
    if (!formData.maxApplicants || parseInt(formData.maxApplicants) < 1) {
      return toast.error('Valid number of applicants is required');
    }
    if (!formData.jobType) {
      return toast.error('Job type is required');
    }
    if (!formData.jobDescription.trim()) {
      return toast.error('Job description is required');
    }
    if (!formData.salary || parseInt(formData.salary) < 1) {
      return toast.error('Valid salary is required');
    }
    if (formData.requirements.some(req => !req.trim())) {
      return toast.error('All requirements must be filled');
    }
    if (formData.tags.length === 0) {
      return toast.error('At least one tag must be selected');
    }

    try {
      setIsLoading(true);
      const result = await postJob(formData);
      
      if (!result || result.success === false) {
        const errorMessage = result?.message || 'Failed to post job';
        toast.error(errorMessage);
      } else {
        const successMessage = result.message || 'Job posted successfully';
        toast.success(successMessage);
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Job posting error:', error);
      toast.error(error?.message || 'Failed to post job');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <JobPostContainer>
        {isLoading && (
          <LoadingModal>
            <FourSquare color="#0A65CC" size="medium" />
          </LoadingModal>
        )}
        <ContentWrapper>
          <Logo onClick={() => {window.location.href = "/"}} src={isDarkMode ? LogoDark : LogoImage} alt="Logo" />
          <ThemeIcon onClick={() => setIsDarkMode(!isDarkMode)} src={isDarkMode ? SunIcon : MoonIcon} alt="Theme Toggle" />
          
          <JobPostForm onSubmit={handleSubmit}>
            <FormSection>
              <Title>Post a New Job</Title>
              
              <InputGroup>
                <InputLabel>Job Title</InputLabel>
                <Input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g., Senior Software Engineer"
                  required
                />

                <Row>
                  <Column>
                    <InputLabel>Job Type</InputLabel> 
                    <Select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Job Type</option>
                      {jobTypeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Select>
                  </Column>

                  <Column>
                    <InputLabel>Salary Type</InputLabel> 
                    <Select
                      name="salaryType"
                      value={formData.salaryType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Salary Type</option>
                      {salaryTypeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Select>
                  </Column>
                </Row>

                <Row>
                  <Column>
                    <InputLabel>Profession Level</InputLabel>
                    <Select
                      name="professionLevel"
                      value={formData.professionLevel}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Level</option>
                      {professionLevelOptions.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </Select>
                  </Column>

                  <Column>
                    <InputLabel>Estimated Budget (USD)</InputLabel>
                    <Input
                      type="number"
                      name="estimatedBudget"
                      value={formData.estimatedBudget}
                      onChange={handleChange}
                      placeholder="e.g., 5000"
                      min="1"
                      required
                    />
                  </Column>
                </Row>

                <Row>
                  <Column>
                    <InputLabel>Maximum Number of Applicants</InputLabel>
                    <Input
                      type="number"
                      name="maxApplicants"
                      value={formData.maxApplicants}
                      onChange={handleChange}
                      placeholder="e.g., 50"
                      min="1"
                      required
                    />
                  </Column>

                  <Column>
                    <InputLabel>Salary {formData.salaryType === 'Hourly' ? '(USD/hour)' : '(USD)'}</InputLabel>
                    <Input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder={formData.salaryType === 'Hourly' ? 'e.g., 25' : 'e.g., 5000'}
                      min="1"
                      required
                    />
                  </Column>
                </Row>

                <InputLabel>Job Description</InputLabel>
                <TextArea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  placeholder="Describe the job role and responsibilities..."
                  rows="4"
                  required
                />

                <ListSection>
                  <InputLabel>Requirements</InputLabel>
                  {formData.requirements.map((req, index) => (
                    <ListItemContainer key={index}>
                      <WideInput
                        type="text"
                        value={req}
                        onChange={(e) => handleListChange(index, e.target.value, 'requirements')}
                        placeholder="Add a requirement"
                        required
                      />
                      <ListItemButton onClick={() => removeListItem(index, 'requirements')}>-</ListItemButton>
                    </ListItemContainer>
                  ))}
                  <AddButton type="button" onClick={() => addListItem('requirements')}>+ Add Requirement</AddButton>
                </ListSection>

                <ListSection>
                  <InputLabel>Desirable Skills</InputLabel>
                  {formData.desirables.map((skill, index) => (
                    <ListItemContainer key={index}>
                      <WideInput
                        type="text"
                        value={skill}
                        onChange={(e) => handleListChange(index, e.target.value, 'desirables')}
                        placeholder="Add a desirable skill"
                      />
                      <ListItemButton onClick={() => removeListItem(index, 'desirables')}>-</ListItemButton>
                    </ListItemContainer>
                  ))}
                  <AddButton type="button" onClick={() => addListItem('desirables')}>+ Add Desirable Skill</AddButton>
                </ListSection>

                <ListSection>
                    <InputLabel>Tags</InputLabel>
                    <SkillsContainer>
                    {tags.map(tag => (
                        <SkillChip
                        key={tag}
                        selected={formData.tags.includes(tag)}
                        onClick={() => handleSkillChange(tag)}
                        >
                        {tag}
                        </SkillChip>
                    ))}
                    </SkillsContainer>
                </ListSection>
              </InputGroup>

              <SubmitButton type="submit">Post Job</SubmitButton>
            </FormSection>
          </JobPostForm>
        </ContentWrapper>
      </JobPostContainer>
    </ThemeProvider>
  );
}

const JobPostContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: ${({theme}) => theme.background};
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  height: 30px;
  cursor: pointer;
`;

const ThemeIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 2;
`;

const JobPostForm = styled.form`
  background-color: ${({theme}) => theme.background};
  border-radius: 8px;
  padding: 20px;
  margin-top: 60px;
`;

const FormSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: ${({theme}) => theme.color};
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputLabel = styled.label`
  color: ${({theme}) => theme.color};
  font-size: 14px;
  margin-bottom: -10px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid ${({theme}) => theme.weakBorderColor};
  border-radius: 4px;
  background-color: ${({theme}) => theme.background};
  color: ${({theme}) => theme.color};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #0A65CC;
  }
`;

const WideInput = styled(Input)`
  flex: 1;
  min-width: 0;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid ${({theme}) => theme.weakBorderColor};
  border-radius: 4px;
  background-color: ${({theme}) => theme.background};
  color: ${({theme}) => theme.color};
  font-size: 14px;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #0A65CC;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid ${({theme}) => theme.weakBorderColor};
  border-radius: 4px;
  background-color: ${({theme}) => theme.background};
  color: ${({theme}) => theme.color};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #0A65CC;
  }
`;

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListItemContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const ListItemButton = styled.button`
  padding: 0 15px;
  background-color: ${({theme})=>theme.secBackground};
  color: #ff4444;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({theme})=>theme.secBackground};
  }
`;

const AddButton = styled.button`
  padding: 8px;
  background-color: ${({theme})=>theme.secBackground};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    background-color: ${({theme})=>theme.secBackground};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #0A65CC;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #085299;
  }
`;

const LoadingModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 5px;
`;

const SkillChip = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${props => props.selected ? '#0A65CC' : 'transparent'};
  color: ${props => props.selected ? 'white' : ({theme}) => theme.color};
  border: 1px solid ${props => props.selected ? '#0A65CC' : ({theme}) => theme.weakBorderColor};
  transition: all 0.2s ease;

  &:hover {
    border-color: #0A65CC;
  }
`;
