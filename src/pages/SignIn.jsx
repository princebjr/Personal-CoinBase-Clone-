import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useReveal from '../hooks/useReveal';



function SignIn() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const formRef = useReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email);
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', flexDirection: 'column', lineHeight: 'normal', letterSpacing: 'normal', fontSize:'16px',width:'448px', margin:'0 auto' ,}}>
      
      <div style={{ padding: '22px 28px',gap:'10px', display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="14" fill="#fff" />
            <path d="M 20.36 20.36 A 9 9 0 1 1 20.36 7.64" fill="none" stroke="#1652F0" strokeWidth="4.5" strokeLinecap="round"/>
          </svg>
        </Link>
      </div>

     
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 24px 64px' }}>
        <div ref={formRef} style={{ width: '100%', maxWidth: '480px' }} className="reveal reveal-fade-up">

          <h1 style={{ color: '#000000', fontSize: 'clamp(1.6rem, 5vw, 2rem)', fontWeight: '800', marginBottom: '28px', letterSpacing: '-0.025em', lineHeight: '1.2' }}>
            Sign in to Coinbase
          </h1>

          <form onSubmit={handleSubmit}>
            <label style={{ display: 'block', color: '#0A0B0D', fontWeight: '', fontSize: '0.875rem', marginBottom: '8px' }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              style={{
                width: '396px',
                lineHeight: '24px',
                letterSpacing: 'normal',
                background: '#ffffff',
                border: '1.5px solid #374151',
                borderRadius: '8px',
                padding: '14px 16px',
                color: '#000000',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
                marginBottom: '14px',
              }}
              onFocus={e => { e.target.style.borderColor = '#4A90D9'; }}
              onBlur={e => { e.target.style.borderColor = '#374151'; }}
            />
            <button
              type="submit"
              style={{
                width: '400px',
                height: '56px',
                height: '48px',
                fontfamily:'Times',
                background: '#0052ff',
                color: '#fff',
                fontWeight: '600',
                letterSpacing: 'normal',
                fontSize: '16px',
                padding: '32px',
                borderRadius: '56px',
                border: 'none',
                cursor: 'pointer',
          
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                
                
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0052ff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0052ff'; }}
            >
              Continue
            </button>
          </form>

          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px',width:'400px' }}>
            <div style={{ flex: 1, height: '1px', background: '#121316' }} />
            <span style={{ color: '#5B616E', fontSize: '13px', fontWeight: '400', letterSpacing: 'normal' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#121316' }} />
          </div>

         
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
           
            <button
              type="button"
              style={{ display: 'flex', width: '400px', height: '56px', alignItems: 'center', justifyContent: 'center', gap: '12px', fontfamily:'Times', background: '#EEF0F3',  borderRadius: '56px', padding: '32px', color:'#0A0B0D', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#18191C'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#111213'; }}
            >
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" left = "10px"
       viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
       <circle cx="12" cy="7" r="4"/>
       <path d="M5.5 21a6.5 6.5 0 0 1 13 0"/>
  </svg>
              Sign in with Passkey
            </button>

           
            <button
              type="button"
              style={{ display: 'flex', width: '400px', height: '56px', alignItems: 'center', justifyContent: 'center', gap: '12px', background: '#EEF0F3', borderRadius: '56px', padding: '13px', color: '#0A0B0D', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#18191C'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#111213'; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>

            
            <button
              type="button"
              style={{ display: 'flex',width: '400px', height: '56px', alignItems: 'center', justifyContent: 'center', gap: '12px', background: '#EEF0F3',  borderRadius: '56px', padding: '13px', color: '#0a0b0d', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#18191C'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#111213'; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0c0c0c">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              Sign in with Apple
            </button>
          </div>

          <p style={{ width: '400px', height: '24px', textAlign: 'center', fontSize: '0.875rem', color: '#000000' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#1652F0', fontWeight: '600', textDecoration: 'none' }}>
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default SignIn;

