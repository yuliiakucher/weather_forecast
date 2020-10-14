import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import CurrentReducer from "./current-reducer";
import thunkMiddleware from 'redux-thunk';
import ForecastReducer from "./forecast-reducer";
import FavReducer from "./fav-reducer";


const reducers = combineReducers({
        CurrentReducer: CurrentReducer,
        ForecastReducer: ForecastReducer,
        FavReducer: FavReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));


export default store
