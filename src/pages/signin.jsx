import { useState, useContext } from 'react'
import { styled, ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../utils/theme.js'
import { Context } from '../App.jsx'
import { NavigationBar } from '../components/navbar.jsx'
import MoonIcon from '../assets/moon.svg'
import SunIcon from '../assets/sun.svg'
import LogoImage from '../assets/Logo.svg'
import LogoDark from '../assets/Logo-dark.svg'
import { signin } from '../utils/auth-requests.js'
import { toast } from 'react-hot-toast';

export function SigninPage() {
  const [isDarkMode,setIsDarkMode] = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Candidate');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const fieldErrors = { ...errors };
  
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        fieldErrors.email = value ? (emailRegex.test(value) ? '' : 'Invalid email address') : 'Email is required';
        break;
  
      case 'password':
        fieldErrors.password = value ? '' : 'Password is required';
        break;
  
      default:
        break;
    }
  
    setErrors(fieldErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    
   
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    signin(formData).then((result) => {
      if (result.success) {
        toast.success('Successfully signed in!');
  
      } else {
        toast.error(result.message || 'Sign in failed');
      }
    }).catch((error) => {
      toast.error('An error occurred during sign in');
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <SignupContainer>
       
        <ContentWrapper>
          <FormSection>
            <ThemeIcon onClick={toggleTheme} src={isDarkMode ? SunIcon : MoonIcon} alt="Theme Toggle" />
            <Logo onClick={()=>{window.location.href = "/"}} src={isDarkMode ? LogoDark :LogoImage} alt="Logo" />
            <Title> Login </Title>
            <SubTitle>Don't have an account? <a onClick={()=>{window.location.href = "signup"}}>Create one</a></SubTitle>
            
            

            <Form onSubmit={handleSubmit}>
              <InputGroup>
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
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                </InputWithError>
                
              </InputGroup>

              <CheckboxGroup>
                <input type="checkbox" id="terms" defaultChecked />
                <label htmlFor="terms">Remember me</label>  
                <label style={{marginLeft: 'auto',color: '#0A65CC',fontSize: '12px'}} htmlFor="terms">Forgot password?</label>
              </CheckboxGroup>

              <SignupButton type="submit">Login</SignupButton>

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
  justify-content: center;
  border-right: 1px solid ${({theme}) => theme.weakBorderColor};
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
  @media screen and (max-width: 954px) {
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
    right: 20px;
    top: 20px; 
    font-size: 1.2rem;
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
