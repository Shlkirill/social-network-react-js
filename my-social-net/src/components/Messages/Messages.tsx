import React from 'react';
import styles from './Messages.module.css';
import DialogueWindow from './DialogueWindow/DialogueWindow';
import { Route } from 'react-router-dom';
import DialogWithPerson from './DialogWithPerson/DialogWithPerson';
import { initialStateFriendsType } from '../../redux/friendsReducer';

type PropsType = {
  friendsPage: initialStateFriendsType,
  addMessage: () => void,
}

const Messages:React.FC<PropsType> = (props) => {
  console.log(props)
  let interlocutorName = props.friendsPage.friends.map(item => <DialogWithPerson key={item.id} name={item.name} id={item.id} img={item.avatar}/>);
  
  let dialogWindowName = interlocutorName.map((item) => {
    // @ts-ignore
    return <Route path={`/messages/${item.props.id}`}><DialogueWindow key={item.props.id} messages={props.friendsPage.messages} 
    id={item.props.id} img={item.props.img} addMessage={props.addMessage}/></Route>
  });

  return (
      <div>
        <h4 className={styles.headline}>Messages</h4>
        <div className={styles.messages}>
            <ul className={styles.dialogs}>
                {interlocutorName}
            </ul>
            {dialogWindowName}
        </div>
      </div>
    )
  }

export default Messages;