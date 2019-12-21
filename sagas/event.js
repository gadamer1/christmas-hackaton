import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAILURE } from '../reducers/events/actions';

function getEventsAPI(data) {
	//return axio.get('/events', { data });
}

function* getEvents() {
	try {
		//const result = yield call(getEventsAPI);
		yield put({
			type: FETCH_EVENTS_SUCCESS
			//data: result.data
		});
	} catch (e) {
		console.error(e);
		yield put({
			type: FETCH_EVENTS_FAILURE,
			error: e
		});
	}
}

function* watchGetEvents() {
	yield takeLatest(FETCH_EVENTS_REQUEST, getEvents);
}

export default function* eventSaga() {
	yield all([ fork(watchGetEvents) ]);
}
