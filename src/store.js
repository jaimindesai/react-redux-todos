import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import todoreducer from './reducers/todo'


export default createStore(todoreducer, 
    composeWithDevTools(applyMiddleware(thunk)
        )
    )

