import {createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {bookReducer,bookDetailReducer,newBookReducer,DUBookReducer} from './Reducers/BooksReducer'
import { userReducer,profileReducer,allUserReducer,DeleteUser } from './Reducers/UserReducers'

const reducer = combineReducers({
    books : bookReducer,
    bookDetail : bookDetailReducer,
    user : userReducer,
    profile : profileReducer,
    newBookReducer : newBookReducer,
    DUBookReducer : DUBookReducer,
    allUserReducer : allUserReducer,
    DeleteUser : DeleteUser
})

let initialState ={}

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store;