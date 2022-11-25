import {NavButton} from '../globalStyles/index.js'
import '../App.css'

// IMPORTING REACT-AWESOME-BUTTON PACKAGES 
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavButton className="glow-on-hover">Log In</NavButton>
      {/* <NavButton>View All Posts</NavButton> */}
       <AwesomeButton className="nav-button" type="primary" >View All Posts</AwesomeButton>
      <NavButton>Create New Post</NavButton>
    </nav>
  )
}
