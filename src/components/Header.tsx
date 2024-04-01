import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Profile from "./profile/Profile";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 ${
        isScrolled ? "bg-[rgba(0,0,0,0.9)]" : "bg-[rgba(0,0,0,0.1)]"
      }`}>
      <header
        className='relative py-3 w-full uppercase text-center flex-wrap flex items-center justify-around'
        style={{ minHeight: "max-content" }}>
        <div>
          <Link
            to='/'
            className='font-mono ml-2 font-extrabold text-red-400'
            style={{ fontSize: "min(2em, 3vmax)" }}>
            Budget Tracker
          </Link>
        </div>
        <nav style={{ marginLeft: "2vmax", fontWeight: "bolder" }}>
          <ul
            className='flex gap-3 font-mono'
            style={{ fontSize: "2.5vmin" }}>
            <li>
              <NavLink
                to='/'
                className='nav-link'>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className='nav-link'
                to='/budget'>
                Budget
              </NavLink>
            </li>
          </ul>
        </nav>
        <Profile />
      </header>
      <hr className='border-gray-400 opacity-45' />
    </div>
  );
}
