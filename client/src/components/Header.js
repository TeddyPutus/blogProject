import React from 'react'
import { HeaderOne, SubHeading } from '../globalStyles'
import Navbar from "../components/Navbar"

export default function Header (props) {
    return (
      <>
        <HeaderOne><i>Lifestyle Local.</i></HeaderOne>
        
       
        <Navbar setHidden={props.setHidden} state={props.state}/> 
        {/* <br /> <br /> */}

        {/* <SubHeading>This is our webpage</SubHeading> */}

      </>
    )
    
}