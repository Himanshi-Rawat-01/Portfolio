import { FiMoon, FiSun } from 'react-icons/fi';

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button className="theme-toggle interactive" onClick={toggleTheme} aria-label="Toggle dark and light theme">
      {theme === 'dark' ? <FiSun /> : <FiMoon />}
    </button>
  );
}

export default ThemeToggle;
