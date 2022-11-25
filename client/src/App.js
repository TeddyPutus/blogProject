// IMPORTING CSS FILE 
import './App.css';

// IMPORTING REACT METHODS
import {useRef,useState, useEffect} from 'react'

//IMPORTING COMPONENTS 
import Header from './components/Header'
// import Navbar from './components/Navbar';
import Footer from "./components/Footer"
import Post from "./components/Post"

// IMPORTING BUTTON PACKAGES 
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { SubHeading } from './globalStyles';

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
    getPosts()
  } catch (error) {
    console.log(error)
    
  }
}

// DELETING A POST 
const [postTitle, deletePost] = useState()

async function deleteBlogPost() {
  try {
    const response = await fetch("http://localhost:5001/:blogPostId", {
      method: "DELETE", 
      headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify({
       title: postTitle
      })
    })

    const data = await response.json();
    setOutput(data.msg);
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


  // const creatingBlogPost = document.querySelector("creatingBlogPost")
  // const createBlogButton = document.getElementById("create-post")
  // createBlogButton.addEventListener(()=> {
  //   creatingBlogPost.classList.remove("creatingBlogPost")
  //   creatingBlogPost.classList.add(".showCreatingBlogPost")
  // })
  


// USE EFFECT FOR DISPLAY ALL POSTS 
useEffect(() => {
   getPosts()
}, []) 
  

  
  
  
  // const creatingBlogPost = document.querySelector("creatingBlogPost")
  // const createBlogButton = document.getElementById("create-post")

  // const ref = useRef(null)

  // useEffect(() => {
  //   const handleCreateNewPostClick = event => {
  //     console.log('Testing if clicked')
  //   }

  //   const element = ref.current
  //   element.addEventListener('click', handleCreateNewPostClick)

  //   return () => {
  //     element.removeEventListener('click', handleCreateNewPostClick)
  //   }

  // },[])


  // return (
  //   <div>
  //     <button ref = {ref}>Click</button>
  //   </div>
  // )

  
  
  
  
  
  
  const [hidden, setHidden] = useState(false)

  return (
    <div className="App">
      <header>
        <div className="titleHeader">
        <Header setHidden={setHidden} state={hidden}/>
       
        </div>
        
        
      </header>
      
      <main>
    
      
        <div className={hidden ? "creatingBlogPost" : "hidden"}>
          <h2>Creating Blog Post</h2>
          
            <input onChange={(event) => setAuthor(event.target.value)} placeholder="What's your name?"/> <br /> <br />
            <input onChange={(event) => setTitle(event.target.value)} placeholder="Enter your post title"/> <br /> <br />
            <input onChange={(event) => setContent(event.target.value)} placeholder="Enter your post here"/> <br /> <br />
            {/* Selecti option drop down here */}
            {/* <input onChange={(event) => setCategory(event.target.value)} placeholder="Category" /> */}


            <select name="genres" id="genres"  onChange={(event) => {setCategory(event.target.value); console.log(event.target.value)}}>
             
              <option>Blog Genre</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Music">Music</option>
              <option value="Book">Books</option>
              <option value="Sport">Sport</option>
              <option value="Sport">Countryside Lifestyle Livin'</option>
            

          </select>
         
          

            <p>{output}</p>

            <button onClick={sendBlogPost}>Post!</button> <br/> <br />
            {/* <button onClick={deleteBlogPost}>Delete Post!</button> <br /> <br /> */}
            
            {/* <button onClick={getPosts}>Get posts!</button> */}
            {/* {getPosts()} */}
        </div>
       
        
        <SubHeading>Your Blog Posts</SubHeading>
        <div className="displayingBlogPosts">
         
            {posts.map((data, key) => (
              <div className="individualPost">
                {/* THIS COMPONENT WILL DISPLAY ALL THE DATA AND A BUTTON FOR COLLAPSING THE CONTENT */}
                <Post author={data.author} title={data.title} content={data.content} category={data.category} key={key} />
                {/* <button onClick={deleteBlogPost}>Delete Post!</button> <br /> <br />
                <button onClick={updateBlogPost}>Update Post!</button> */}
               
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
