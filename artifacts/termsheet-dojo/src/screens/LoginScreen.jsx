import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ go }) {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      go('home');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'linear-gradient(135deg, #FFF8F0 0%, #FFE8D6 100%)',
    }}>
      {/* Mascot */}
      <div style={{ fontSize: 64, marginBottom: 8 }}>🐉</div>

      <h1 style={{
        fontFamily: "'Baloo 2', cursive",
        fontSize: 32,
        color: '#2D2D2D',
        marginBottom: 4,
      }}>
        {isSignUp ? 'Join VC Dojo' : 'Welcome Back'}
      </h1>
      <p style={{
        fontFamily: "'Nunito', sans-serif",
        color: '#8C8C8C',
        fontSize: 15,
        marginBottom: 24,
      }}>
        {isSignUp ? 'Create an account to save your progress' : 'Your progress is waiting for you'}
      </p>

      {/* Google Sign-In */}
      <button
        onClick={handleGoogle}
        style={{
          width: '100%',
          maxWidth: 340,
          padding: '14px',
          borderRadius: 16,
          border: '2px solid #E0D6CC',
          background: '#FFFFFF',
          fontFamily: "'Nunito', sans-serif",
          fontSize: 16,
          fontWeight: 700,
          color: '#2D2D2D',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 16,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Continue with Google
      </button>

      {/* Divider */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 340,
        marginBottom: 16,
      }}>
        <div style={{ flex: 1, height: 1, background: '#E0D6CC' }} />
        <span style={{ padding: '0 12px', color: '#B0A090', fontSize: 13, fontFamily: "'Nunito', sans-serif" }}>or</span>
        <div style={{ flex: 1, height: 1, background: '#E0D6CC' }} />
      </div>

      {/* Email Form */}
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 340 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: 12,
            border: '2px solid #E0D6CC',
            background: '#FFFFFF',
            fontFamily: "'Nunito', sans-serif",
            fontSize: 16,
            marginBottom: 10,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: 12,
            border: '2px solid #E0D6CC',
            background: '#FFFFFF',
            fontFamily: "'Nunito', sans-serif",
            fontSize: 16,
            marginBottom: 16,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        {error && (
          <div style={{
            color: '#E8626C',
            fontSize: 14,
            fontFamily: "'Nunito', sans-serif",
            marginBottom: 12,
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 16,
            border: 'none',
            background: loading ? '#CCC' : 'linear-gradient(135deg, #FF7B54 0%, #FF6B6B 100%)',
            fontFamily: "'Nunito', sans-serif",
            fontSize: 17,
            fontWeight: 800,
            color: '#FFF',
            cursor: loading ? 'default' : 'pointer',
            marginBottom: 12,
          }}
        >
          {loading ? '...' : (isSignUp ? 'Create Account' : 'Log In')}
        </button>
      </form>

      {/* Toggle sign up / login */}
      <button
        onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
        style={{
          background: 'none',
          border: 'none',
          color: '#FF7B54',
          fontFamily: "'Nunito', sans-serif",
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          marginBottom: 20,
        }}
      >
        {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
      </button>

      {/* Guest mode */}
      <button
        onClick={() => go('home')}
        style={{
          background: 'none',
          border: 'none',
          color: '#B0A090',
          fontFamily: "'Nunito', sans-serif",
          fontSize: 14,
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        Play without an account
      </button>
    </div>
  );
}
