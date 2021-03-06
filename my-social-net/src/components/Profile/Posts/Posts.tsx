import React from 'react';
import styles from './Posts.module.css';
import Post from './Post/Post';
import FormAddNewText from '../../../common/forms/AddNewText';
import { reduxForm } from 'redux-form';
import { PropsTypePosts } from './PostsContainer'


const Posts: React.FC<PropsTypePosts> = React.memo((props) => {

  const ContactForm = reduxForm({
    form: 'newPost'
    //@ts-ignore
  })(FormAddNewText);

  const onSubmit = (value: {newPost: string}) => {
    props.addPost(value.newPost)
  }

  let result = props.postsData.map(item => <Post key={item.id} text={item.text} likes={item.likes} addLike={props.addLike} profile={props.profile} />);
  return (
    <div className={styles.postsBlock}>
      <div className={styles.createPost}>
        <h3> My posts</h3>
        {/* @ts-ignore */}
        <ContactForm onSubmit={onSubmit} name={'newPost'} placeholder={'send new post'} />
      </div>
      <div className={styles.posts}>  
        {result}
      </div>
    </div>
  )
}
)
export default Posts;