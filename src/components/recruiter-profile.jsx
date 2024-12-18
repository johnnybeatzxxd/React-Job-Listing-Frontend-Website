import { useState, useContext } from 'react';
import { styled, ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../utils/theme.js';
import { Context } from '../App.jsx';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

import MoonIcon from '../assets/moon.svg';
import SunIcon from '../assets/sun.svg';
import LogoImage from '../assets/Logo.svg';
import LogoDark from '../assets/Logo-dark.svg';
import DefaultAvatar from '../assets/default-avatar.svg'; 
import { CountryDropdown } from '../components/countries-dropdown.jsx';

import { create_profile } from '../utils/auth-requests.js';

export function RecruiterProfileSetup({fullName}) {
  const [searchParams] = useSearchParams();
  const [isDarkMode, setIsDarkMode] = useContext(Context);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(DefaultAvatar);
  
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: fullName || '',
    country: '',
    companySize: '',
    industry: '',
    companyWebsite: '',
    about: '',
    linkedin: '',
    twitter: ''
  });

  const companySizeOptions = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees'
  ];

  const industryOptions = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'E-commerce',
    'Manufacturing',
    'Consulting',
    'Other'
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'hourlyRate' && value !== '') {
      const rate = parseFloat(value);
      if (rate < 1) return;
    }

    if (['portfolio', 'github', 'linkedin', 'twitter'].includes(name)) {
      let urlValue = value.trim();
      
      if (urlValue && !urlValue.match(/^https?:\/\//i)) {
        urlValue = 'https://' + urlValue;
      }
      
      setFormData(prev => ({ ...prev, [name]: urlValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.companyName.trim()) {
      return toast.error('Company name is required');
    }
    if (!formData.fullName.trim()) {
      return toast.error('Full name is required');
    }
    if (!formData.country) {
      return toast.error('Country is required');
    }
    if (!formData.industry) {
      return toast.error('Industry is required');
    }

    try {
      const response = await create_profile(formData);
      if (response.success) {
        toast.success('Profile updated successfully!');
        window.location.href = "/";
      } else {
        toast.error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred while updating profile');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <ProfileContainer>
        <ContentWrapper>
          <Logo onClick={() => {window.location.href = "/"}} src={isDarkMode ? LogoDark : LogoImage} alt="Logo" />
          <ThemeIcon onClick={toggleTheme} src={isDarkMode ? SunIcon : MoonIcon} alt="Theme Toggle" />
          
          <ProfileForm onSubmit={handleSubmit}>
            <ImageSection>
              <ProfileImageWrapper>
                <ProfileImage src={previewImage} alt="Profile" />
                <ImageUploadLabel htmlFor="profile-image">
                  Update Photo
                </ImageUploadLabel>
                <ImageInput
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </ProfileImageWrapper>
            </ImageSection>

            <FormSection>
              <Title>Complete Company Profile</Title>
              
              <InputGroup>
                <InputLabel>Company Name *</InputLabel>
                <Input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Acme Corporation"
                  required
                />

                <InputLabel>Your Full Name *</InputLabel>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />

                <div>
                  <InputLabel>Country *</InputLabel>
                  <CountryDropdown
                    value={formData.country}
                    onChange={(country) => setFormData(prev => ({ ...prev, country }))}
                    required
                  />
                </div>

                <InputLabel>Industry *</InputLabel>
                <Select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Industry</option>
                  {industryOptions.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </Select>

                <InputLabel>Company Size</InputLabel>
                <Select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                >
                  <option value="">Select Company Size</option>
                  {companySizeOptions.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </Select>

                <InputLabel>Company Website</InputLabel>
                <Input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  placeholder="https://www.company.com"
                />

                <InputLabel>About Company</InputLabel>
                <TextArea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Tell us about your company..."
                  rows="4"
                />

                <SocialSection>
                  <InputLabel>Social Links</InputLabel>
                  <Input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn Company Page"
                  />
                  <Input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="Twitter Profile"
                  />
                </SocialSection>
              </InputGroup>

              <SaveButton type="submit">Save Company Profile</SaveButton>
            </FormSection>
          </ProfileForm>
        </ContentWrapper>
      </ProfileContainer>
    </ThemeProvider>
  );
}

const ProfileContainer = styled.div`
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

const ProfileForm = styled.form`
  background-color: ${({theme}) => theme.background};
  border-radius: 8px;
  padding: 20px;
  margin-top: 60px;
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({theme}) => theme.weakBorderColor};
`;

const ImageUploadLabel = styled.label`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #0A65CC;
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
`;

const ImageInput = styled.input`
  display: none;
`;

const FormSection = styled.div`
  max-width: 600px;
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

const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SaveButton = styled.button`
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


