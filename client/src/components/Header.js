import React from 'react'
import { HeaderOne, SubHeading } from '../globalStyles'
import Navbar from "../components/Navbar"

export default function Header () {
    return (
      <>
        <HeaderOne><i>Good Lifestyle Keeping</i></HeaderOne>
        
        {/* <SubHeading>This is our webpage</SubHeading> */}
        <Navbar />

      </>
    )
    
}