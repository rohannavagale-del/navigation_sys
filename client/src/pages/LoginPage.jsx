import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Monitor, Home, ArrowLeft, GraduationCap, ChevronDown } from 'lucide-react';
import mitLogo from '../assets/mit-logo.png';
import campusPhoto from '../assets/mit_dome_building.jpg';

export default function LoginPage({ onGoHome }) {
  const [role, setRole] = useState('Faculty');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      setLoginSuccess(true);
      setTimeout(() => {
        setLoginSuccess(false);
        onGoHome();
      }, 1500);
    }
  };

  const toggleRole = () => {
    setRole(role === 'Faculty' ? 'Student' : 'Faculty');
  };

  return (
    <div className="login-page-root">
      {/* Full Screen Photo Backdrop */}
      <div 
        className="login-full-backdrop" 
        style={{ backgroundImage: `url(${campusPhoto})` }}
      >
        <div className="login-backdrop-overlay"></div>
      </div>

      {/* Translucent Glass Top Header */}
      <header className="login-header-glass">
        <div className="login-brand" onClick={onGoHome}>
          <img src={mitLogo} alt="MIT ADT Logo" className="login-logo-img" />
          <div className="login-brand-text">
            <h1 className="login-brand-title">MIT Art, Design and Technology University, Pune</h1>
            <span className="login-brand-motto">A Leap Towards World Class Education</span>
          </div>
        </div>

        <div className="login-header-actions">
          <button className="role-switch-btn glass-btn" onClick={toggleRole}>
            <GraduationCap size={16} />
            <span>{role === 'Faculty' ? 'Student Login' : 'Faculty Login'}</span>
          </button>
          <button className="icon-home-btn glass-btn" onClick={onGoHome} title="Return to Map / Home">
            <Home size={18} />
          </button>
        </div>
      </header>

      {/* Floating Centered Glassmorphism Login Container */}
      <main className="login-main-viewport">
        <div className="login-glass-card compact-login-card">
          {/* Header with compact School badge & Role selector */}
          <div className="login-card-header">
            <div className="compact-dept-badge">
              <Monitor size={15} className="compact-dept-icon" />
              <span>School of Computing</span>
            </div>
            <div className="role-select-wrapper">
              <select 
                className="role-dropdown-select"
                value={role} 
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Faculty">Faculty</option>
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
              </select>
              <ChevronDown size={12} className="dropdown-arrow" />
            </div>
          </div>

          <div className="compact-title-wrap">
            <h3 className="compact-login-title">{role} Portal</h3>
          </div>

          {loginSuccess && (
            <div className="login-alert-success">
              ✅ Welcome to MIT-ADT! Redirecting...
            </div>
          )}

          {/* Form Credentials */}
          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="input-group-pill">
              <User size={15} className="pill-icon" />
              <input 
                type="text" 
                placeholder="Username or PRN" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group-pill">
              <Lock size={15} className="pill-icon" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="eye-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            <button type="submit" className="login-submit-btn">
              Log In
            </button>
          </form>

          {/* Return link */}
          <div className="login-footer-nav">
            <button className="back-pill-link" onClick={onGoHome}>
              <ArrowLeft size={13} />
              <span>Back to Campus Map</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
