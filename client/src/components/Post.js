import {useState} from'react'
import '../App.css'

import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default function Post (props) {

    //State for checking whether post is folded or not (so it has a boolean)
    const [readMore,setReadMore] = useState(false);
    //Ternary operator for the button value - will it say read more or read less - depending on whether its collapsed or not
    const buttonName = readMore ? 'Read Less 🥹':'Read More 📖'

    //state for changing the length of the blog post content 
    const [content, setContent] = useState()

    async function deleteBlogPost() {
        try {
          const response = await fetch(`http://localhost:5001/blogPosts/${props.id}`,{
            method: "DELETE"
          })
      
          const data = await response.json();
          props.updateAllPosts(props.id);
        } catch (error) {
          console.log(error)
        }
      }

// Takes from database
  return (
      
        <div className="post">
            <h2>{props.title}</h2>
             <h3>{props.author}</h3>
        {/* ternary operator for choosing the length of blog post  */}
        {/* starts at first char and ends at 10th char and only shows that */}
             <p>{readMore ? props.content : `${props.content.substring(0, 12)}...`}</p>
             <p>Category: {props.category}</p>
             {/* the button  */}
             <button className="read-more-button" onClick={()=>{setReadMore(!readMore)}}><h2>{buttonName}</h2></button> <br />
             {/* <AwesomeButton type="secondary" className="read-more-button" onClick={()=>{setReadMore(!readMore)}}><h2>{buttonName}</h2></AwesomeButton> */}
             <button onClick = {deleteBlogPost} class = 'deleteButton'>Delete Post</button>
        </div>
   
    )
}