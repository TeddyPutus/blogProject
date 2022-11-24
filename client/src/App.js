// IMPORTING CSS FILE 
import './App.css';

// IMPORTING REACT METHODS
import {useState, useEffect} from 'react'

//IMPORTING COMPONENTS 
import Header from './components/Header'
// import Navbar from './components/Navbar';
import Footer from "./components/Footer"
import Post from "./components/Post"



function App() {

  //USING "useState" TO CREATE BLOG POSTS 
  const [author, setAuthor] = useState()
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [category, setCategory] = useState()

  // SETTING THE OUTPUT FROM WHAT IS ENTERED 
  const [output, setOutput] = useState()



  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)

  // useEffect(() => {
  //   fetch('http://localhost:5001/blogPosts')
  //   .then(res => res.json())
  //   .then(res => {
  //     setBlogs(res.blog)
  //   },
  //   error => {
  //     setError(error)
  //   })
  // )}, 

  // [])


  const [posts, setPosts] = useState([])

  const [newPost, setNewPost] = useState({
    author: "",
    title: "",
    content: "",
    category: ""
})


//PUT - CREATING A BLOG POST 
async function sendBlogPost() {
  try {
       // WORKING WITH OUR OWN REST API - USING OUR LOCALHOST
    // {} ALLOWS YOU TO SEND ADDITIONAL INFORMATION 
    const response = await fetch("http://localhost:5001/blogPosts/", {
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
    setOutput(`Thank you ${data.author} for posting your blog with title ${data.title}`);
  } catch (error) {
    console.log(error)
    
  }
}

//GETTING ALL POSTS FROM DB-button
async function getPosts() {
  try {
    const response = await fetch("http://localhost:5001/blogPosts/")

    // data=array of objects
    const data = await response.json()
  
    setPosts(data)
  
  
  } catch (error) {
    console.log(error)
    
  }
}

  return (
    <div className="App">
      <header>
        <Header />
        <hr/>
      </header>
      
      <main>
    
        <hr />
        <div className="creatingBlogPost">
          <h2>Creating Blog Post</h2>
            <input onChange={(event) => setAuthor(event.target.value)} placeholder="What's your name?"/> <br />
            <input onChange={(event) => setTitle(event.target.value)} placeholder="Enter your post title"/> <br />
            <input onChange={(event) => setContent(event.target.value)} placeholder="Enter your post here"/> <br />
            <input onChange={(event) => setCategory(event.target.value)} placeholder="Category"/>

            <p>{output}</p>

            <button onClick={sendBlogPost}>Post!</button> <br/> <br />
            
            <button onClick={getPosts}>Get posts!</button>
        </div>
        <hr />

        <div className="displayingBlogPosts">
            {posts.map((data, key) => (
              <div className="individualPost">
                {/* THIS COMPONENT WILL DISPLAY ALL THE DATA AND A BUTTON FOR COLLAPSING THE CONTENT */}
                <Post author={data.author} title={data.title} content={data.content} category={data.category} key={key} />
               
            </div>
          ))}
      
        </div>
       
        
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
