import React from "react";

function Comments({ comments }) {
    return (
        <div>
            <h3>Comments</h3>
            <ul className="comment-list">
                {comments.map(comment => (
                    <li>
                        <p className="comment-name">{comment.name}</p>
                        <p className="comment-time">{comment.timestamp}</p>
                        <p>{comment.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Comments;