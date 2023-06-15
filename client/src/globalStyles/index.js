import styled from "styled-components";
import "../App.css";
// STYLED COMPONENTS
//COMPONENTS NEED TO START WITH A CAPITAL LETTER

export const HeaderOne = styled.h1`
  display: block;
  text-align: left;
  font-size: 5vw;
  color: #413c69;
  margin: 10px;
  font-family: "Merriweather Sans", sans-serif;

  transition: 1s;
`;

// export const NavBar = styled.nav`
/* padding-left: 2000px; */
/* background-color: goldenrod; */
/* display: flex;
  flex-flow: column wrap;
  align-content: flex-end;
  text-align: center; */

// `

export const But = styled.button`
  display: flex;
  flex-direction: column;
`;

export const NavButton = styled.button`
  /* display: flex;
    flex-direction: column; */
  /* background-color: gold;
    padding: 15px;  */
  /* margin-left: 850px;
    margin-top: 10px;
    margin-bottom: 10px; */
  /* font-family:Arial, Helvetica, sans-serif ;
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
    color: darkblue;
    width: fit-content; */
  /* width: 210px; */

  /* max-width:fit-content; */
  width: 150px;
  height: auto;
  font-size: 20px;
  font-family: "Merriweather Sans", sans-serif;
  padding: 15px;
  margin: 15px;
  margin-bottom: 15px;
`;

export const SubHeading = styled.h3`
  /* display: inline-block; */
  font-size: 2vw;
  /* text-align: left;  */
  color: green;
  font-family: "Merriweather Sans", sans-serif;
  /* display: inline; */
`;
