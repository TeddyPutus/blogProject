import { useState, useEffect } from "react";
import "../App.css";

import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

export default function Post(props) {
  //State for checking whether post is folded or not (so it has a boolean)
  const [readMore, setReadMore] = useState(false);
  //Ternary operator for the button value - will it say read more or read less - depending on whether its collapsed or not
  const buttonName = readMore ? "Read Less" : "Read More";

  //state for changing the length of the blog post content
  const [content, setContent] = useState();
  const [randomImage, setRandomImage] = useState("");

  async function deleteBlogPost() {
    try {
      const response = await fetch(
        `http://localhost:5001/blogPosts/${props.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      props.updateAllPosts(props.id);
    } catch (error) {
      console.log(error);
    }
  }

  const displayImage = () => {
    const createRandomImg = Math.floor(Math.random() * 300);
    const image = `https://picsum.photos/id/${createRandomImg}/440/380/`;

    let Images = [];
    for (let pic = 0; pic < 100; pic++) {
      Images.push(image);
    }

    const fetchRandomImg = Math.floor(Math.random() * Math.floor(100));

    return Images[fetchRandomImg];
  };

  useEffect(() => {
    setRandomImage(displayImage);
  }, []);

  return (
    <div className="post">
      <div className="post-image-text-box">
        <img className="blogImage" src={displayImage()} />
        <h3 className="post-author"> By {props.author}</h3>
        <h2 className="post-title">{props.title}</h2>
        {/* ternary operator for choosing the length of blog post  */}
        {/* starts at first char and ends at 10th char and only shows that */}
        <p className="post-content">
          {readMore ? props.content : `${props.content.substring(0, 12)}...`}
        </p>
        <p className="post-category">Category: {props.category}</p>
      </div>
      <div className="post-button-box">
        <button onClick={deleteBlogPost} className="deleteButton">
          Delete Post
        </button>
        <button
          className="read-more-button"
          onClick={() => {
            setReadMore(!readMore);
          }}
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
}
