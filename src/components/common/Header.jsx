import React from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import './Header.css';

const Header = ({ title, showBack = true, rightAction = null }) => {
  const { goBack } = useNavigation();

  return (
    <header className="app-header">
      <div className="header-left">
        {showBack && (
          <button className="back-btn" onClick={goBack} aria-label="Go Back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        )}
      </div>
      
      <div className="header-title">
        <h1>{title}</h1>
      </div>

      <div className="header-right">
        {rightAction}
      </div>
    </header>
  );
};

export default Header;
