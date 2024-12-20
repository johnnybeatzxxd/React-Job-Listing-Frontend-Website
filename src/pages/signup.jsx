import { useState, useContext, useEffect } from 'react'
import { styled, ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../utils/theme.js'
import { Context } from '../App.jsx'
import { toast } from 'react-hot-toast';

import MoonIcon from '../assets/moon.svg'
import SunIcon from '../assets/sun.svg'
import LogoImage from '../assets/Logo.svg'
import LogoDark from '../assets/Logo-dark.svg'

import { signup } from '../utils/auth-requests.js'

export function SignupPage() {
  const [isDarkMode,setIsDarkMode] = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Candidate');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fullName: '',
    companyName: '',
    role: role,
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData(prevData => {
      const newData = { ...prevData, [name]: value };
  
      if (name === 'firstName' || name === 'lastName') {
        const firstName = name === 'firstName' ? value : prevData.firstName;
        const lastName = name === 'lastName' ? value : prevData.lastName;
        newData.fullName = `${firstName} ${lastName}`.trim();
      }
  
      return newData;
    });
  
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    console.log('Validation Errors:', validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log('Setting errors:', validationErrors);
      return;
    }
    
    console.log('form submitted successfully!');
    console.log(formData)
    signup(formData).then((result) => {
        if (!result.success) {
            const errorMessage = typeof result.message === 'string' ? result.message : JSON.stringify(result.message);
            toast.error(errorMessage);
        } else {
            const successMessage = typeof result.message === 'string' ? result.message : JSON.stringify(result.message);
            toast.success(successMessage);
            window.location.href = '/set-profile';
        }
    });
  };
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const validateForm = () => {
    const newErrors = {};
    
   
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
  
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    

    if (role === 'Candidate') {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
    } else {
      if (!formData.companyName) newErrors.companyName = 'Company name is required';
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
    }

    return newErrors;
  };
  const validateField = (name, value) => {
    const fieldErrors = { ...errors };
  
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        fieldErrors.email = value ? (emailRegex.test(value) ? '' : 'Invalid email address') : 'Email is required';
        break;
  
      case 'password':
        fieldErrors.password = value.length >= 6 ? '' : 'Password must be at least 6 characters';
        break;
  
      case 'confirmPassword':
        fieldErrors.confirmPassword = value === formData.password ? '' : 'Passwords do not match';
        break;
  
      case 'firstName':
        fieldErrors.firstName = value ? '' : 'First name is required';
        break;
  
      case 'lastName':
        fieldErrors.lastName = value ? '' : 'Last name is required';
        break;
  
      case 'companyName':
        fieldErrors.companyName = value ? '' : 'Company name is required';
        break;
  
      case 'fullName':
        fieldErrors.fullName = value ? '' : 'Full name is required';
        break;
  
      default:
        break;
    }
  
    setErrors(fieldErrors);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <SignupContainer>
       
        <ContentWrapper>
          <FormSection>
            <Logo onClick={()=>{window.location.href = "/"}} src={isDarkMode ? LogoDark :LogoImage} alt="Logo" />
            <ThemeIcon onClick={toggleTheme} src={isDarkMode ? SunIcon : MoonIcon} alt="Theme Toggle" />
            <Title>Create account.</Title>
            <SubTitle>Already have an account? <a onClick={()=>{window.location.href = '/signin'} }>Login</a></SubTitle>
            
            <ButtonGroup>
            <RoleButton 
                style={role === 'Candidate' ? { backgroundColor: '#0A65CC', color: 'white' } : {backgroundColor: 'transparent', color: '#0A65CC'}} 
                onClick={() => {
                  setRole('Candidate');
                  setFormData(prev => ({ ...prev, role: 'Candidate' }));
                }}
              >
                Candidate
              </RoleButton>

              <RoleButton 
                style={role === 'Recruiter' ? { backgroundColor: '#0A65CC', color: 'white' } : {backgroundColor: 'transparent', color: '#0A65CC'}} 
                onClick={() => {
                  setRole('Recruiter');
                  setFormData(prev => ({ ...prev, role: 'Recruiter' }));
                }}
              >
                Recruiter
              </RoleButton>

              
            </ButtonGroup>

            <Form onSubmit={handleSubmit}>
              <InputGroup>
              {role === 'Candidate' ? (
                  <>
                
                    <InputWithError>
                      <Input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
                    </InputWithError>

                    <InputWithError>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
                    </InputWithError>
                  </>
                ) : (
                  <>
                    <InputWithError>
                      <Input
                        type="text"
                        placeholder="Company Name"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                      {errors.companyName && <ErrorMessage>{errors.companyName}</ErrorMessage>}
                    </InputWithError>

                    <InputWithError>
                      <Input
                        type="text"
                        placeholder="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                      {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
                    </InputWithError>
                  </>
                )}
                <InputWithError>
                  <Input
                    type="email"
                    placeholder="Email address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </InputWithError>
                
                <InputWithError>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                </InputWithError>
                
                <InputWithError>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
                </InputWithError>
              </InputGroup>
              <CheckboxGroup>
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">I agree to the Terms & Conditions</label>
              </CheckboxGroup>

              <SignupButton type="submit">Create Account</SignupButton>

            </Form>
          </FormSection>

          <ImageSection>
            <StatsOverlay>
              <h2>Over 175,324 candidates</h2>
              <h2>waiting for good employees.</h2>
              <Stats>
                <StatItem>
                  <Number>175,324</Number>
                  <Label>Live Job</Label>
                </StatItem>
                <StatItem>
                  <Number>97,354</Number>
                  <Label>Companies</Label>
                </StatItem>
                <StatItem>
                  <Number>7,532</Number>
                  <Label>New Jobs</Label>
                </StatItem>
              </Stats>
            </StatsOverlay>
          </ImageSection>
        </ContentWrapper>
      </SignupContainer>
    </ThemeProvider>
  );
}

const SignupContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${({theme}) => theme.background};
`;

const ContentWrapper = styled.div`
  display: flex;
  height: calc(100vh - 0px);
`;

const FormSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ImageSection = styled.div`
  flex: 1;
  background-image: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.8) 100%
  ),
  url('https://static9.depositphotos.com/1559686/1097/i/600/depositphotos_10973851-stock-photo-silhouettes-of-business.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(10, 101, 204, 0.178) 0%,
      rgba(0, 47, 108, 0.95) 100%
    );
  }
  @media (max-width: 944px) {
    display: none;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  color: ${({theme}) => theme.color};
  height: 30px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  color: ${({theme}) => theme.color};
  font-size: 24px;
  margin-bottom: 0px;
`;

const SubTitle = styled.p`
  color: ${({theme}) => theme.secColor};
  margin-bottom: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const RoleButton = styled.button`
  padding: 8px 24px;
  border: 1px solid ${({theme}) => theme.weakBorderColor};
  background:  ${props => props.active ? '#0A65CC' : 'transparent'};
  color: ${props => props.active ? 'white' : ({theme}) => theme.color};
  border-radius: 4px;
  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid ${({theme}) => theme.weakBorderColor};
  border-radius: 4px;
  outline: none;
  background: ${({theme}) => theme.background};
  color: ${({theme}) => theme.color};
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  color: ${({theme}) => theme.color};
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #0A65CC;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const StatsOverlay = styled.div`
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;
  
  h2 {
    font-size: 32px;
    margin: 0;
  }
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 24px;
  margin-top: 20px;
  position: relative;
  z-index: 1;
`;

const StatItem = styled.div`
  text-align: center;
`;

const Number = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Label = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const ThemeIcon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    right: 40px;
    top: 20px; 
    font-size: 1.2rem;
    z-index: 2;
`

const InputWithError = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ErrorMessage = styled.span`
  color: #ff0000;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;
