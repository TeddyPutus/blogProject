import {NavButton} from '../globalStyles/index.js'



export default function Navbar() {
  return (
    <nav className="navbar">
      <NavButton>Log In</NavButton>
      <NavButton>View All Posts</NavButton>
      <NavButton>Settings</NavButton>
      <NavButton>Trending</NavButton>
      <NavButton>What's Hot</NavButton>
      <NavButton>About</NavButton>
      <NavButton>Send Feedback</NavButton>



    </nav>
  )
}
