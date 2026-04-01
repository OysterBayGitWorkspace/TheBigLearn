import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ go }) {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    go('login');
  };

  return (
    <div style={{ padding: '24px 18px', maxWidth: 480, margin: '0 auto' }}>
      {/* Back button */}
      <button
        onClick={() => go('home')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: "'Nunito', sans-serif",
          fontSize: 15,
          color: '#8C8C8C',
          marginBottom: 24,
          padding: 0,
        }}
      >
        ← Back
      </button>

      <h2 style={{
        fontFamily: "'Baloo 2', cursive",
        fontSize: 28,
        color: '#2D2D2D',
        marginBottom: 24,
      }}>
        Profile
      </h2>

      {user ? (
        <div>
          <div style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '20px',
            border: '2px solid #E8DDD0',
            marginBottom: 16,
          }}>
            <div style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 13,
              color: '#B0A090',
              marginBottom: 4,
            }}>
              Signed in as
            </div>
            <div style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 17,
              fontWeight: 700,
              color: '#2D2D2D',
            }}>
              {user.email}
            </div>
          </div>

          <div style={{
            background: '#F0FBF0',
            borderRadius: 12,
            padding: '12px 16px',
            marginBottom: 24,
            fontFamily: "'Nunito', sans-serif",
            fontSize: 14,
            color: '#5BB5A2',
          }}>
            Your progress is synced to the cloud
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 16,
              border: '2px solid #E8626C',
              background: 'transparent',
              fontFamily: "'Nunito', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              color: '#E8626C',
              cursor: 'pointer',
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <p style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 15,
            color: '#8C8C8C',
            marginBottom: 16,
          }}>
            You're playing as a guest. Create an account to save your progress across devices.
          </p>
          <button
            onClick={() => go('login')}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 16,
              border: 'none',
              background: 'linear-gradient(135deg, #FF7B54 0%, #FF6B6B 100%)',
              fontFamily: "'Nunito', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: '#FFF',
              cursor: 'pointer',
            }}
          >
            Create Account
          </button>
        </div>
      )}
    </div>
  );
}
