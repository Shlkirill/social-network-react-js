
const ADD_MESSAGE = 'ADD_MESSAGE';
const ADD_FRIEND = 'ADD_FRIEND';

type addMessageActionType = {
  type: typeof ADD_MESSAGE,
  text: string,
  id: number
}
type addFriendActionType = {
  type: typeof ADD_FRIEND,
  id: number,
  avatar: string,
  name: string
}

type friendsReducerType = addMessageActionType | addFriendActionType;

export const addMessageActionCreator = (text:string, id:number):addMessageActionType => {
  return {
    type: ADD_MESSAGE,
    text,
    id,
  }
}
export const addFriendAC = (id:number, avatar:string, name:string):addFriendActionType => {
  return {
    type: ADD_FRIEND,
    id,
    avatar,
    name
  }
}

export type friendsType = {
  id: number,
  name: string,
  avatar: string,
}
export type messagesType = {
  id: number,
  name: string,
  text: string
}
export type initialStateFriendsType = typeof initialState;

let initialState = {
  friends: [{id:1, name:'kirill'}
  ] as Array<friendsType>,

  messages: {
    1: [
      { id: 1, name: 'Andrey', text: 'Hello!' },
      { id: 2, name: 'Me', text: 'Hi!' },
      { id: 3, name: 'Andrey', text: 'How are you?' },
      { id: 4, name: 'Me', text: 'I`m ok, and you?' },
      { id: 5, name: 'Andrey', text: 'I`m fine!' }
    ] as Array<messagesType>
  }
};

const friendsReducer = (state = initialState, action:friendsReducerType ):initialStateFriendsType => {
  let stateCopy;

  switch (action.type) {
    case ADD_MESSAGE:
      stateCopy = {
        ...state,
        messages: { ...state.messages },
      };
      //@ts-ignore
      let newId = stateCopy.messages[action.id].length + 1;
      let newMessage = {
        id: newId,
        name: 'Me',
        text: action.text,
      };
      //@ts-ignore
      stateCopy.messages[action.id].push(newMessage);
      return stateCopy;
    case ADD_FRIEND:
      let newFriend = {
        id: action.id,
        name: action.name,
        avatar: action.avatar
      }
      stateCopy = {
        ...state,
      };
      stateCopy.friends.push(newFriend);

      return stateCopy;
    default:
      return state;
  }
}

export default friendsReducer;