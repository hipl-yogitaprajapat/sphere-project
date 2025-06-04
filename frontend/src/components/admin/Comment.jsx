import { useRef, useState } from 'react';

const Comment = ({ comment, addReply }) => {

    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replyText, setReplyText] = useState('');
    const inputRef = useRef(null)

    const handleReply = () => {
        setShowReplyBox(true);
       setTimeout(()=>{inputRef.current.focus()},1) 
    }

    const handleCancel = () => {
        setReplyText('');
        setShowReplyBox(false);
    };

    const handleReplySave=(commentId)=>{
        // console.log("---save---",commentId,replyText);
        addReply(commentId,replyText);
        setShowReplyBox(false);
        setReplyText("")
    }

    const handleKeyDown = (e,commentId) =>{
        console.log(e.key);
        if(e.key === "Enter"){
            handleReplySave(commentId);
        }else if(e.key === "Escape"){
            handleCancel();
        }
    }

    return (
        <li key={comment.id} className="mb-4">
            <div className="p-2 bg-gray-100 rounded-md shadow-sm">
                <p className="text-gray-800">{comment.display}</p>
                {!showReplyBox && (
                    <button
                        onClick={handleReply}
                        className="text-sm text-blue-600 hover:underline mt-2"
                    >
                        Reply
                    </button>
                )}

                {showReplyBox ? (
                    <div className="mt-3 space-y-2">
                        <input
                            type="text"
                            ref={inputRef}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e)=> handleKeyDown(e,comment.id)}
                            placeholder="Write your reply..."
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="flex gap-2">
                            <button
                                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={() => handleReplySave(comment.id)}
                            >
                                Save
                            </button>
                            <button
                                className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : null}
                {
                    comment.children.length ? (
                        <ul className='ml-4'>
                            {
                                comment.children.map((item) => (
                                    <Comment
                                        key={item.id}
                                        comment={item}
                                        addReply={addReply}
                                    />
                                ))
                            }
                        </ul>
                    ):null
                }
            </div>
        </li>
    );
};

export default Comment;
