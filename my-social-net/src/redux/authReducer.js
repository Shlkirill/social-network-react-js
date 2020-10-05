import { Redirect } from "react-router-dom";
import { apiAuth, apiLogin, apiLogout } from "../api/api";

export const setUserDataAC = (data, isAuth) => {
  return {
    type: "SET_USER_DATA",
    data,
    isAuth
  }
}
export const toogleIfFetchingAC = (isFetching) => {
  return {
    type: 'TOOGLE_IS_FETCHING',
    isFetching
  }
}
export const setLoginAC = (login, password, remember) => {
  return {
    type: 'SET_LOGIN',
    login,
    password,
    remember
  }
}

let initialState = {
  email: null,
  id: null,
  login: null,
  isFetching: false,
  isAuth: false,
};

const AuthReducer = (state = initialState, action) => {
  let stateCopy;

  switch (action.type) {
    case "SET_USER_DATA":
      stateCopy = {
        ...state,
        ...action.data,
        isAuth: action.isAuth,
      };
      return stateCopy;
    case 'TOOGLE_IS_FETCHING':
      stateCopy = {
        ...state,
        isFetching: action.isFetching
      }
      return stateCopy;
    case 'SET_LOGIN':
      stateCopy = {
        ...state,
      };
      return stateCopy;
    default:
      return state;
  }
}

export const authorizationTC = () => {
  return (dispatch) => {
    apiAuth().then((response) => {
      if (response.resultCode === 0) {
        dispatch(setUserDataAC(response.data, true));
      };
    });
  }
};


export const accountLoginTC = (obj) => {
  return (dispatch) => {
    apiLogin(obj).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setUserDataAC(response.data, true));
        alert('Вы вошли')
      } else {
        alert('где то ошибочка')
      }
    })
  }
}

export const outOfAccountTC = () => {
  return (dispatch) => {
    apiLogout().then(()=> {
      dispatch(setUserDataAC(null, false));
      alert('Вы вышли')
    })
  }
}



export default AuthReducer;