import produce from 'immer';
import { FETCH_EVENTS_FAILURE, FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS } from './actions';

const initialState = {
	events: [],
	error: null
};

const dummy = [
	{
		longitude: 127.02986,
		latitude: 37.5843
	},
	{
		longitude: 127.0299,
		latitude: 37.5844
	},
	{
		longitude: 127.023,
		latitude: 37.5845
	},
	{
		longitude: 127.03,
		latitude: 37.589
	},
	{
		longitude: 127.02986,
		latitude: 37.584
	}
];

export default (eventsReducer = (state = initialState, action) => {
	return (state, draft) => {
		switch (action.type) {
			case FETCH_EVENTS_REQUEST: {
				break;
			}
			case FETCH_EVENTS_SUCCESS: {
				//draft.events = action.data;
				draft.events = dummy;
				break;
			}
			case FETCH_EVENTS_FAILURE: {
				draft.error = action.error;
				break;
			}
			default: {
				break;
			}
		}
	};
});
