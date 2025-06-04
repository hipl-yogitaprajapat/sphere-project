import { useState } from "react";
import Comment from "./Comment";

const Comments = () => {
  const [input, setInput] = useState('')
  const [comments, setComments] = useState([
    {
      id: 1,
      display: "hey yogita",
      children: [
        {
          id: 2,
          display: "how are you",
          children: [
            {
              id: 3,
              display: "fine",
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 4,
      display: "Awesome",
      children: []
    }
  ])


  const handleChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value)
  }

  const newComment = (text) => {
    return {
      id: new Date().getTime(),
      display: text,
      children: []
    }
  }

  const handleNewComment = () => {
    setComments([...comments, newComment(input)])
    setInput("");
  }

  const addReply=(parentId,text)=>{
    // console.log("---parent---",parentId,text);
    const copyComment = [...comments];
    addComments(copyComment,parentId,text)
    setComments(copyComment)
  }

  const addComments=(comments,parentId,text)=>{
    for(let i=0;i<comments.length;i++){
      let comment = comments[i];      
      if(comment.id === parentId){
        // console.log("----Found First Level----",parentId,text);
        comment.children.unshift(newComment(text));
      }
    }

    for(let i=0;i<comments.length;i++){
      let comment = comments[i]
        // console.log("----Found children Level----",parentId);
        addComments(comment.children, parentId, text);
    }

  }

  return (
    <>
 <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4">💬 Nested Comments</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Write a comment..."
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        />
        <button
          onClick={handleNewComment}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Add Comment
        </button>
      </div>

      <div>
        {comments.map((item) => (
          <Comment key={item.id} comment={item} addReply={addReply} />
        ))}
      </div>
    </div>
    </>
  )
}

export default Comments