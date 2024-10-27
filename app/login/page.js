"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase.config';
import { FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import {Snackbar, Alert } from '@mui/material';

const Login = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const [showPasswordSignup, setShowPasswordSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Add this line
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleLogin = async (e) => {
    e.preventDefault();
    console.log("login button pressed")
    console.log(email);
    console.log(password);
    setLoading(true);

    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        setSnackbarMessage('Login successful');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        console.log(email);
        console.log(password);
        setTimeout(() => {
        window.location.href = '/main';
        }, 1500);
    } catch (error) {
        console.log(error);
        setSnackbarMessage('Invalid email or password');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    } finally {
        setLoading(false);
    }
    };

    onAuthStateChanged(auth, (user) => {
		if (user) {
			sessionStorage.setItem(
				'user',
				JSON.stringify({ userId: user.uid })
			);
		}
	});

    const handleSignup = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
        setSnackbarMessage('Please enter a valid email address.');
        setSnackbarOpen(true);
        return;
    }

    if (password !== confirmPassword) {
        setSnackbarMessage('Passwords do not match.');
        setSnackbarOpen(true);
        return;
    }

    setLoading(true);

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        sessionStorage.setItem('user', JSON.stringify({ userId: res.user.uid }));
        setSnackbarMessage('Signup successful!');
        setSnackbarOpen(true);
        setTimeout(() => {
        window.location.href = '/main';
        }, 1500);
    } catch (error) {
        console.error(error);
        setSnackbarMessage('Signup failed. Please try again.');
        setSnackbarOpen(true);
    } finally {
        setLoading(false);
    }
    };


	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

  
  const flip = () => {
        setIsFlipped(!isFlipped);
        if (!isFlipped) {
            // Reset the state when flipping to signup
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setUsername(''); // Reset username when switching to signup
        } else {
            // Reset the state when flipping to login
            setEmail('');
            setPassword('');
        }
    };

    const toggleShowPasswordLogin = () => setShowPasswordLogin(!showPasswordLogin);
    const toggleShowPasswordSignup = () => setShowPasswordSignup(!showPasswordSignup);
  
    // Function to render the login form
    const renderLoginForm = () => (
        <Form onSubmit={handleLogin}>
          <h1>LOGIN</h1>
          <InputWrapper>
            <Input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="icon" />
          </InputWrapper>
          <InputWrapper>
            <Input
              type={showPasswordLogin ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordToggleIcon onClick={toggleShowPasswordLogin}>
              {showPasswordLogin ? <FaEye /> : <FaEyeSlash />}
            </PasswordToggleIcon>
          </InputWrapper>
          <Options>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forget Password?</a>
          </Options>
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'LOGIN'}
          </Button>
          <SwitchLink>
            Don't have an account? <a onClick={flip}>Sign Up</a>
          </SwitchLink>
        </Form>
      );
      
  
    // Function to render the signup form
    const renderSignupForm = () => (
        <Form onSubmit={handleSignup}>
          <h1>SIGN UP</h1>
          <InputWrapper>
            <Input
                type="text"
                placeholder="User Name"
                required
                value={username} // Bind to state
                onChange={(e) => setUsername(e.target.value)} // Handle changes
            />
            <FaUser className="icon" />
        </InputWrapper>
        
          <InputWrapper>
            <Input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="icon" />
          </InputWrapper>
          <InputWrapper>
            <Input
              type={showPasswordSignup ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordToggleIcon onClick={toggleShowPasswordSignup}>
              {showPasswordSignup ? <FaEye /> : <FaEyeSlash />}
            </PasswordToggleIcon>
          </InputWrapper>
          <InputWrapper>
            <Input
              type={showPasswordSignup ? "text" : "password"}
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <PasswordToggleIcon onClick={toggleShowPasswordSignup}>
              {showPasswordSignup ? <FaEye /> : <FaEyeSlash />}
            </PasswordToggleIcon>
          </InputWrapper>
          <Options>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forget Password?</a>
          </Options>
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'SIGN UP'}
          </Button>
          <SwitchLink>
            Already have an account? <a onClick={flip}>Log In</a>
          </SwitchLink>
        </Form>
      );
      
  
    return (
      <Container>
        <StyledBox>
          <StyledBoxContent >
            {isFlipped ? renderSignupForm() : renderLoginForm()}
          </StyledBoxContent>
        </StyledBox>
        <Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
      </Container>
    );
  };
  

export default Login;

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Poppins", sans-serif;
  color: white;
  background-color: #ffffff;
`;

const StyledBox = styled.div`
  width: 530px;
  height: 90vh;
  perspective: 1000px;
  position: relative;

`;


const StyledBoxContent = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: ${({ isFlipped }) => (isFlipped ? "rotateY(180deg)" : "rotateY(0deg)")};
  transition: transform 0.6s ease;
  backface-visibility: hidden;
`;

const Form = styled.form`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  backface-visibility: hidden;
  opacity: ${({ isFlipped }) => (isFlipped ? 0 : 1)};
  transition: opacity 0.6s ease;
  background-color: rgba(37, 17, 58, 0.85); /* Background with some opacity */
`;

const LoginForm = styled(Form)`
  z-index: ${({ isFlipped }) => (isFlipped ? 1 : 2)};
`;

const SignupForm = styled(Form)`
  transform: rotateY(180deg);
  z-index: ${({ isFlipped }) => (isFlipped ? 2 : 1)};
`;

// The rest of your styled components remain unchanged...
const InputWrapper = styled.div`
  position: relative;
  margin: 15px 0;
  width: 27rem;

  .icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid white;
  border-radius: 15px;
  background: transparent;
  font-size: 1.4rem;
  color: white;

  &::placeholder {
    color: white;
    font-size: 1.2rem;
  }

  &:focus {
    border-color: cyan;
  }
`;

const PasswordToggleIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 15px;

  label {
    font-size: 1rem;
  }

  a {
    font-size: 1rem;
    text-decoration: none;
    color: white;
  }
`;

const Button = styled.button`
  width: 27rem;
  padding: 15px;
  margin: 15px 0;
  background-color: white;
  color: black;
  font-size: 1.5rem;
  font-weight: 700;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-0.4rem);
  }
`;

const SwitchLink = styled.div`
  font-size: 1rem;
  font-style: italic;

  a {
    color: blueviolet;
    cursor: pointer;
    transition: 0.5s ease;

    &:hover {
      color: red;
      transform: scale(1.1);
    }
  }
`;
