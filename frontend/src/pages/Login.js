// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { 
//   Box, Container, Typography, TextField, Button, 
//   Paper, Alert, CircularProgress
// } from '@mui/material';
// import { LockOutlined as LockIcon } from '@mui/icons-material';

// const Login = () => {
//   const { login, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   // Redirect if already authenticated
//   React.useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/dashboard');
//     }
//   }, [isAuthenticated, navigate]);
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     // Validate form
//     if (!formData.username || !formData.password) {
//       return setError('Please fill in all fields');
//     }
    
//     try {
//       setLoading(true);
//       await login(formData.username, formData.password);
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data || 'Login failed. Please check your credentials.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <Container maxWidth="xs">
//       <Box
//         sx={{
//           mt: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center'
//         }}
//       >
//         <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <LockIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
//             <Typography component="h1" variant="h5">
//               Sign In
//             </Typography>
//           </Box>
          
//           {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          
//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               autoFocus
//               value={formData.username}
//               onChange={handleChange}
//               disabled={loading}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={formData.password}
//               onChange={handleChange}
//               disabled={loading}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={24} /> : 'Sign In'}
//             </Button>
//             <Box sx={{ textAlign: 'center', mt: 2 }}>
//               <Typography variant="body2">
//                 Don't have an account?{' '}
//                 <Link to="/register" style={{ textDecoration: 'none' }}>
//                   Sign Up
//                 </Link>
//               </Typography>
//             </Box>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { 
//   Box, Container, Typography, TextField, Button, 
//   Paper, Alert, CircularProgress
// } from '@mui/material';
// import { LockOutlined as LockIcon } from '@mui/icons-material';

// const Login = () => {
//   const { login, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   React.useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/dashboard');
//     }
//   }, [isAuthenticated, navigate]);
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (!formData.username || !formData.password) {
//       return setError('Please fill in all fields');
//     }
//     try {
//       setLoading(true);
//       await login(formData.username, formData.password);
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data || 'Login failed. Please check your credentials.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <Container maxWidth="xs">
//       <Box
//         sx={{
//           mt: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center'
//         }}
//       >
//         <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <LockIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
//             <Typography component="h1" variant="h5">
//               Sign In
//             </Typography>
//           </Box>
          
//           {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          
//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               autoFocus
//               value={formData.username}
//               onChange={handleChange}
//               disabled={loading}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={formData.password}
//               onChange={handleChange}
//               disabled={loading}
//             />
//             {/* Forgot Password Link */}
//             <Box sx={{ textAlign: 'right', mt: 1 }}>
//               <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
//                 Forgot Password?
//               </Link>
//             </Box>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={24} /> : 'Sign In'}
//             </Button>
//             <Box sx={{ textAlign: 'center', mt: 2 }}>
//               <Typography variant="body2">
//                 Don't have an account?{' '}
//                 <Link to="/register" style={{ textDecoration: 'none' }}>
//                   Sign Up
//                 </Link>
//               </Typography>
//             </Box>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { 
//   Box, Container, Typography, TextField, Button, 
//   Paper, Alert, CircularProgress
// } from '@mui/material';
// import { LockOutlined as LockIcon } from '@mui/icons-material';

// const Login = () => {
//   const { loginWithJwt } = useAuth(); // <-- add this to your AuthContext if missing!
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const [otp, setOtp] = useState('');
//   const [step, setStep] = useState('login'); // 'login' or 'otp'
//   const [userId, setUserId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleOtpChange = (e) => setOtp(e.target.value);

//   // --- Step 1: Submit username/password ---
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (!formData.username || !formData.password) {
//       return setError('Please fill in all fields');
//     }
//     try {
//       setLoading(true);
//       const res = await fetch('/api/auth/signin', {
//         method: 'POST',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(formData)
//       });
//       const data = await res.json();
//       if (data.twoFactorRequired) {
//         setUserId(data.userId);
//         setStep('otp');
//       } else if (data.token) {
//         // fallback: rare, if 2FA is not required
//         await loginWithJwt(data.token, data);
//         navigate('/dashboard');
//       } else {
//         setError(data.message || 'Login failed.');
//       }
//     } catch (err) {
//       setError('Login failed. Please check your credentials.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Step 2: Submit OTP ---
//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (!otp) return setError('Please enter OTP code');
//     try {
//       setLoading(true);
//       const res = await fetch('/api/auth/verify-otp', {
//         method: 'POST',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({ userId, otp })
//       });
//       const data = await res.json();
//       if (data.token) {
//         await loginWithJwt(data.token, data);
//         navigate('/dashboard');
//       } else {
//         setError(data.message || 'OTP invalid or expired');
//       }
//     } catch (err) {
//       setError('OTP verification failed.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box
//         sx={{
//           mt: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center'
//         }}
//       >
//         <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <LockIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
//             <Typography component="h1" variant="h5">
//               Sign In
//             </Typography>
//           </Box>
          
//           {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

//           {/* ----- Step 1: Login Form ----- */}
//           {step === 'login' && (
//             <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 3 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="username"
//                 label="Username"
//                 name="username"
//                 autoComplete="username"
//                 autoFocus
//                 value={formData.username}
//                 onChange={handleChange}
//                 disabled={loading}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 disabled={loading}
//               />
//               {/* Forgot Password Link */}
//               <Box sx={{ textAlign: 'right', mt: 1 }}>
//                 <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
//                   Forgot Password?
//                 </Link>
//               </Box>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//                 disabled={loading}
//               >
//                 {loading ? <CircularProgress size={24} /> : 'Sign In'}
//               </Button>
//               <Box sx={{ textAlign: 'center', mt: 2 }}>
//                 <Typography variant="body2">
//                   Don't have an account?{' '}
//                   <Link to="/register" style={{ textDecoration: 'none' }}>
//                     Sign Up
//                   </Link>
//                 </Typography>
//               </Box>
//             </Box>
//           )}

//           {/* ----- Step 2: OTP Form ----- */}
//           {step === 'otp' && (
//             <Box component="form" onSubmit={handleOtpSubmit} sx={{ mt: 3 }}>
//               <Alert severity="info" sx={{ mb: 2 }}>
//                 An OTP code has been sent to your email. Please enter it below.
//               </Alert>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="otp"
//                 label="One-Time Password (OTP)"
//                 name="otp"
//                 autoFocus
//                 value={otp}
//                 onChange={handleOtpChange}
//                 disabled={loading}
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//                 disabled={loading}
//               >
//                 {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
//               </Button>
//             </Box>
//           )}

//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Box, Container, Typography, TextField, Button, 
  Paper, Alert, CircularProgress
} from '@mui/material';
import { LockOutlined as LockIcon } from '@mui/icons-material';

const Login = () => {
  // This should store JWT and user info after successful login/OTP
  const { loginWithJwt } = useAuth(); // Make sure this is implemented in your AuthContext
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('login'); // 'login' or 'otp'
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handles changes for login fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // Handles change for OTP input
  const handleOtpChange = (e) => setOtp(e.target.value);

  // Handles login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.username || !formData.password) {
      return setError('Please fill in all fields');
    }
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.twoFactorRequired) {
        setUserId(data.userId);
        setStep('otp');
      } else if (data.token) {
        await loginWithJwt(data.token, data);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handles OTP form submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!otp) return setError('Please enter OTP code');
    try {
      setLoading(true);
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp })
      });
      const data = await res.json();
      if (data.token) {
        await loginWithJwt(data.token, data);
        navigate('/dashboard');
      } else {
        setError(data.message || 'OTP invalid or expired');
      }
    } catch (err) {
      setError('OTP verification failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <LockIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
          </Box>
          
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          {/* Step 1: Login form */}
          {step === 'login' && (
            <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              {/* Forgot Password Link */}
              <Box sx={{ textAlign: 'right', mt: 1 }}>
                <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
                  Forgot Password?
                </Link>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </Box>
          )}

          {/* Step 2: OTP form */}
          {step === 'otp' && (
            <Box component="form" onSubmit={handleOtpSubmit} sx={{ mt: 3 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                An OTP code has been sent to your email. Please enter it below.
              </Alert>
              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="One-Time Password (OTP)"
                name="otp"
                autoFocus
                value={otp}
                onChange={handleOtpChange}
                disabled={loading}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
              </Button>
            </Box>
          )}

        </Paper>
      </Box>
    </Container>
  );
};

export default Login;