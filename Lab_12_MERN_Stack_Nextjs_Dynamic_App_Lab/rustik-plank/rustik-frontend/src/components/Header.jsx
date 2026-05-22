"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <>
      <header className="site-header">
        <div className="logo">
          <span><span className="r">R</span>ustik Plank</span>
          <span className="subtitle">&nbsp;</span>
        </div>

        {/* Top nav links (Home, Blog, About Us, Contact Us) */}
        <nav style={{ display: 'flex', gap: '20px', fontSize: '12px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#333' }}>Home</Link>
          <a href="#" style={{ color: '#333' }}>Blog</a>
          <a href="#" style={{ color: '#333' }}>About Us</a>
          <a href="#" style={{ color: '#333' }}>Contact Us</a>
        </nav>
      </header>
      
      <nav className="primary-nav">
        <div className="inner">
          <ul>
            <li className={pathname === '/beds' ? 'active' : ''}><Link href="/beds">Beds</Link></li>
            <li className={pathname === '/cabinets' ? 'active' : ''}><Link href="/cabinets">Cabinets</Link></li>
            <li className={pathname === '/bookcases' ? 'active' : ''}><Link href="/bookcases">Bookcases</Link></li>
            <li className={pathname === '/boxes' ? 'active' : ''}><Link href="/boxes">Boxes</Link></li>
            <li className={pathname === '/chairs' ? 'active' : ''}><Link href="/chairs">Chairs</Link></li>
            <li className={pathname === '/tables' ? 'active' : ''}><Link href="/tables">Tables</Link></li>
          </ul>

          {/* Search */}
          <form className="nav-search" role="search" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Search…" aria-label="Search" />
            <button type="submit" aria-label="Go"><i className="fas fa-search"></i></button>
          </form>
        </div>
      </nav>
    </>
  );
}
