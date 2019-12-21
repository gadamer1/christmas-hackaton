import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	USER_LOCATION_CHANGE_REQUEST,
	USER_LOCATION_CHANGE_SUCCESS,
	USER_LOCATION_CHANGE_FAILURE
} from './actions';

const initialState = {
	user_location: {
		latitude: 0,
		longitude: 0,
		latitudeDelta: 0.0001,
		longitudeDelta: 0.0001
	}
};

export default (userReducer = (state = initialState, action) => {
	switch (action.type) {
		//LOGIN
		case LOGIN_REQUEST: {
			return {
				...state
			};
		}
		case LOGIN_SUCCESS: {
			return {
				...state,
				user: action.data
			};
		}
		case LOGIN_FAILURE: {
			return {
				...state,
				user: null,
				error: acation.data.error
			};
		}

		// USER_LOCATION_CHANGE
		case USER_LOCATION_CHANGE_REQUEST: {
			return {
				...state,
				user_location: {
					...state.user_location,
					latitude: action.data.latitude,
					longitude: action.data.longitude
				}
			};
		}

		default: {
			return { ...state };
		}
	}
});
