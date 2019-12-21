import {all,fork,takeLatest,put,call} from 'redux-saga/effects'
import axios from 'axios'

import {LOGIN_FAILURE,LOGIN_SUCCESS,LOGIN_REQUEST} from '../reducers/user/actions'

function loginAPI(data){
    return axio.put('/user',{data})
}

function* login(action){
    try{
        const User = yield call(loginAPI,action.data)
        yield put({
            type: LOGIN_SUCCESS,
            data: User
        })
    }catch(e){
        console.error(e);
        yield put({
            type: LOGIN_FAILURE,
            error:e
        })
    }
}

function * watchLogin(){
    yield takeLatest(LOGIN_REQUEST,login)
}


export default function * userSaga(){
    yield all([fork(watchLogin)])
}