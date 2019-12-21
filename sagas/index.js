import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import eventSaga from './event';

export default function* rootSaga() {
	yield all([ fork(eventSaga) ]);
}
