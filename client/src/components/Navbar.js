import {NavButton} from '../globalStyles/index.js'
import '../App.css'

// IMPORTING REACT-AWESOME-BUTTON PACKAGES 
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';


export default function Navbar(props) {
    
  return (
    <nav className="navbar">
      <NavButton className="glow-on-hover">Log In</NavButton> <br />
      <NavButton>View All Posts</NavButton> <br /> <br />
       {/* <AwesomeButton className="nav-button" type="primary" >View All Posts</AwesomeButton> <br /> <br /> <br /> */}
       {/* <AwesomeButton id="create-post" className="nav-button" type="primary" onClick={() => {props.setHidden(!props.state)}}>Create New Post</AwesomeButton> */}
      <NavButton onClick={() => {props.setHidden(!props.state)}}>Create New Post</NavButton>
    </nav>
  )
}
