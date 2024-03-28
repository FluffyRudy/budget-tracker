import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <div className='sticky top-0'>
      <header
        className='relative py-3 w-full bg-[rgba(0, 0, 0, 0.7)] uppercase text-center flex-wrap flex items-center justify-around'
        style={{ minHeight: "max-content" }}>
        <div>
          <Link
            to='/'
            className='ml-2 font-extrabold  text-red-400'
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
                to='/login'>
                Budget
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <hr className='border-gray-400 opacity-45' />
    </div>
  );
}
