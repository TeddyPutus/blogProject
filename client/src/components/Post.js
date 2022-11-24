import {useState} from'react'
import '../App.css'
export default function Post (props) {

    //State for checking whether post is folded or not (so it has a boolean)
    const [readMore,setReadMore] = useState(false);
    //Ternary operator for the button value - will it say read more or read less - depending on whether its collapsed or not
    const buttonName = readMore ? 'Read Less':'Read More☺︎'

    //state for changing the length of the blog post content 
    const [content, setContent] = useState()


    return (
        <div className="post">
            <h2>{props.title}</h2>
             <h3>{props.author}</h3>
        {/* ternary operator for choosing the length of blog post  */}
        {/* starts at first char and ends at 10th char and only shows that */}
             <p>{readMore ? props.content : `${props.content.substring(0, 12)}...`}</p>
             <p>Category: {props.category}</p>
             {/* the button  */}
             <button className="read-more-button" onClick={()=>{setReadMore(!readMore)}}><h2>{buttonName}</h2></button>
        </div>
   
    )
}