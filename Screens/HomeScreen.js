import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { FETCH_EVENTS_REQUEST } from '../reducers/events/actions';

const HomeScreen = () => {
	const { events } = useSelector((state) => state.events);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!events) {
			dispatch({
				type: FETCH_EVENTS_REQUEST
			});
		}
	});
	return (
		<View>
			{events && <Text>현재 이벤트 개수는 총 {events.length}개 입니다</Text>}
			<Text>aa</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center'
	}
});

export default HomeScreen;
