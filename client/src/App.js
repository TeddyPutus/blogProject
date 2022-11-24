// IMPORTING CSS FILE 
import './App.css';

// IMPORTING REACT METHODS
import {useState, useEffect} from 'react'

//IMPORTING COMPONENTS 
import Header from './components/Header'
// import Navbar from './components/Navbar';
import Footer from "./components/Footer"



function App() {

  //USING "useState" TO CREATE BLOG POSTS 
  const [author, setAuthor] = useState()
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [category, setCategory] = useState()

  // SETTING THE OUTPUT FROM WHAT IS ENTERED 
  const [output, setOutput] = useState()

  // MAKING THE BLOG POSTS COLLAPSIBLE
  const [readMore,setReadMore]=useState(false);
  const buttonName = readMore ? 'Read Less << ':'Read More >> '

//   const [error, setError] = useState(null)
//   const [posts, setPosts] = useState([])
//   const [newPost, setNewPost] = useState({
  
//     blogPost: "",
//     author: ""
// })

//WILL DISPLAY THE DATA RECIEVED FROM BACKEND 
function displayBlogPosts () {
  return (
    <div className="allPosts">
      
    </div>
  )
}

// Use effect function for stuff to happen immediately on page render
// useEffect(() => {
//   fetch("http://localhost:5001/blogPost/")
//     .then((res) => res.json())
//     .then((res) => {
//     setPosts(res.posts)
//     },
//       (error) => {
//         setError(error)
//       }
//     )
// },[])

async function sendBlogPost() {
  try {
       // WORKING WITH OUR OWN REST API - USING OUR LOCALHOST
    // {} ALLOWS YOU TO SEND ADDITIONAL INFORMATION 
    const response = await fetch("http://localhost:5001", {
      method: "POST", 
      // TELLS OUR SERVER HOW THE API HANDLES DATA - which is JSON 
      headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify({
      
        author: author, 
        content: content, 
        title: title, 
        category: category
      })
    })
    const data = await response.json();
    console.log(data)
    setOutput(data.msg);
  } catch (error) {
    console.log(error)
    
  }
}

// ARRAY OF OBJECTS - TBD
const arr = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."]

  return (
    <div className="App">
      <header>
        <Header />
        <hr/>
      </header>
      
      <main>
        <hr/>
        <div className="info">
            {arr.map((item, index) => {
                return (
                  <div className="individual">
                    <h2>{item}here</h2>
                    {/* <button>See more</button> */}
                    <button className="read-more-button" onClick={()=>{setReadMore(!readMore)}}><h2>{buttonName}</h2></button>
                    {/* {readMore && extraContent} */}
                  </div>
                )
            })}
        </div>

        <hr />
        <div className="creatingBlogPost">
          <h2>Creating Blog Post</h2>
            <input onChange={(event) => setAuthor(event.target.value)} placeholder="What's your name?"/> <br />
            <input onChange={(event) => setTitle(event.target.value)} placeholder="Enter your post title"/> <br />
            <input onChange={(event) => setContent(event.target.value)} placeholder="Enter your post here"/> <br />
            <input onChange={(event) => setCategory(event.target.value)} placeholder="Category"/>

            <p>{output}</p>
            <button onClick={sendBlogPost}>Post!</button> <br/> <br />


        </div>
        <hr />
       
        
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
