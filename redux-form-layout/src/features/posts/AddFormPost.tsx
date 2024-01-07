import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { postAdded } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { UserProps } from '../users/usersSlice'

const AddFormPost = () => {

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const dispatch = useDispatch();

    const users = useSelector(selectAllUsers);

    const onTitleChange = event => setTitle(event.target.value);
    const onContentChange = event => setContent(event.target.value);
    const onAuthorChange = event => {
        return setUserId(event.target.value);
    }
    // const canSave = [title,content,userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {

        try {
            setAddRequestStatus('pending')
        }
        catch (err) {
            if (err instanceof Error) {
                console.error("Failed to save the post", err.message)
            }
        }
        finally {
            setAddRequestStatus('idle');
        }
    }


    const usersOptions = users.map((user: UserProps) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section style={{ display: "flex", flexDirection: "column" }}>
            <h2>Add a New Post</h2>
            <form style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor='postTitle'>Post Title:</label>
                <input
                    type='text'
                    id='postTitle'
                    name="postTitle"
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor='postContent'>Content:</label>
                <textarea
                    id='postContent'
                    name='postContent'
                    value={content}
                    onChange={onContentChange}
                />
                <label htmlFor='postAuthor'>Author:</label>
                <select id='postAuthor' value={userId} onChange={onAuthorChange}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <button type='button' onClick={onSavePostClicked}>Save Post</button>
            </form>
        </section>
    )
}

export default AddFormPost