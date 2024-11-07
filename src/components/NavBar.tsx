import { Link } from "react-router-dom"


export const NavBar = () => {
  return (
    <nav className="flex gap-4 bg-slate-700  ">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  )
}
