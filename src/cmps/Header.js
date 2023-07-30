function Header({ theme }) {
  return (
    <h1>
      {theme === 'dark' ? '🌙' : '🌞'} 2023-Summer {theme === 'dark' ? '🌙' : '🌞'}
    </h1>
  );
}

export default Header;
