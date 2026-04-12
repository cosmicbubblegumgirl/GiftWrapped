import Navbar from '../Navbar/Navbar';

function Layout({ children }) {
  return (
    <div className="page-shell">
      <div className="page-shell__sparkles" />
      <div className="page-shell__ribbon page-shell__ribbon--left" />
      <div className="page-shell__ribbon page-shell__ribbon--right" />
      <Navbar />
      <main className="page-main">{children}</main>
      <footer className="site-footer">
        <p>GiftWrapped turns gift browsing into a ribbon-tied little celebration.</p>
        <span>Whimsical. Dynamic. Ready to submit.</span>
      </footer>
    </div>
  );
}

export default Layout;
