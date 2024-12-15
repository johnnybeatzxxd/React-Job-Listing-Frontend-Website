import { useState, useContext } from 'react'
import { styled, ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../utils/theme.js'
import { Context } from '../App.jsx'
import { NavigationBar } from '../components/navbar.jsx'
import MoonIcon from '../assets/moon.svg'
import SunIcon from '../assets/sun.svg'
import LogoImage from '../assets/Logo.svg'
import LogoDark from '../assets/Logo-dark.svg'

export function SignupPage() {
  const [isDarkMode,setIsDarkMode] = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Candidate');
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <SignupContainer>
       
        <ContentWrapper>
          <FormSection>
            <Logo onClick={()=>{window.location.href = "/"}} src={isDarkMode ? LogoDark :LogoImage} alt="Logo" />
            <ThemeIcon onClick={toggleTheme} src={isDarkMode ? SunIcon : MoonIcon} alt="Theme Toggle" />
            <Title>Create account.</Title>
            <SubTitle>Already have an account? Login</SubTitle>
            
            <ButtonGroup>
              <RoleButton style={role === 'Candidate' ? { backgroundColor: '#0A65CC', color: 'white' } : {backgroundColor: 'transparent', color: '#0A65CC'}} onClick={() => setRole('Candidate')} active>Candidate</RoleButton>
              <RoleButton style={role === 'Recruiter' ? { backgroundColor: '#0A65CC', color: 'white' } : {backgroundColor: 'transparent', color: '#0A65CC'}} onClick={() => setRole('Recruiter')}>Recruiter</RoleButton>
            </ButtonGroup>

            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Input
                  type="text"
                  placeholder={role === 'Candidate' ? "First Name" : "Company Name"}
                  name={role === 'Candidate' ? "firstName" : "companyName"}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  placeholder={role === 'Candidate' ? "Last Name" : "Full Name"}
                  name={role === 'Candidate' ? "lastName" : "fullName"}
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
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