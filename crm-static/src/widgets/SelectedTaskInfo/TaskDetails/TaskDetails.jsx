import React, {useState} from 'react';
import styles from "pages/SelectedTask/SelectedTask.module.scss";
import {Button, Input, Tag} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "entities/user/userSlice.js";
import {CloseOutlined} from "@ant-design/icons";
import {formattedDate} from "shared/utils/utils.jsx";
import {addComment, deleteComment} from "entities/tasks/asyncActions.js";
import {useParams} from "react-router-dom";

const {TextArea} = Input

const TaskDetails = ({Status, Title, Description, comments = []}) => {


    const dispatch = useDispatch()
    const [commentValue, setCommentValue] = useState('')
    const {Code, TaskId} = useParams()


    const {user} = useSelector(selectUser)

    const removeComment = (index) => {
        dispatch(deleteComment({TaskId, Code, comments, index}))
    }

    const createComment = () => {
        if (!commentValue.trim()) return

        const newComment = {
            author: user.name,
            text: commentValue,
        }
        dispatch(addComment({...newComment, TaskId, Code, comments}))
        setCommentValue('')
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            createComment()
            setCommentValue('')
        }
    }


    return (
        <div className={styles.taskDetailsPanel}>
            <div className={styles.taskDetailsCard}>
                <h3>Task Details</h3>
                <div className={styles.taskInfoHeader}>
                    <div>
                        <h2>{Title}</h2>
                        <p>{Description}</p>
                    </div>
                    <Tag color="blue">{Status}</Tag>
                </div>
                <h4>Comments</h4>
                <div className={styles.commentsSection}>
                    <div className={styles.commentsList}>
                        {comments && comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={comment.text} className={styles.commentItem}>
                                    <div className={styles.commentContent}>
                                        <div className={styles.commentHeader}>
                                            <h4>{comment.author}</h4>
                                            <div className={styles.commentIcon}>
                                                {user.name === comment.author ? (
                                                    <CloseOutlined onClick={() => removeComment(index)}/>
                                                ) : null}
                                            </div>
                                        </div>
                                        <p>{comment.text}</p>
                                        <span
                                            className={styles.commentTimestamp}>{formattedDate(comment.timestamp)}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>
                    <div className={styles.addCommentSection}>
                        <TextArea
                            placeholder="Add a comment..."
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            style={{resize: 'none', width: 'auto', height: '100px'}}
                            onKeyPress={(e) => handleKeyPress(e)}
                        />
                        <Button type="primary" onClick={createComment}>Add Comment</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;