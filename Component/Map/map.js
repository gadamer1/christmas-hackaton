import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE, MapViewAnimated } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { USER_LOCATION_CHANGE_REQUEST } from '../../reducers/user/actions';
import { FETCH_EVENTS_REQUEST } from '../../reducers/events/actions';

const threshold = 0.0001;

const latitude_event = 37.5846;
const longitude_event = 127.0278392;

const Map = () => {
	const { events } = useSelector((state) => {
		state.events;
	});
	const { user_location } = useSelector((state) => state.user);
	const [ long, setLong ] = useState(0);
	const [ lat, setLat ] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!events) {
			dispatch({
				type: FETCH_EVENTS_REQUEST
			});
		}
	});

	useEffect(
		() => {
			setEvents(
				events &&
					events.filter((v) => {
						if (
							Math.abs(v.latitude - user_location.latitude) < threshold &&
							Math.abs(v.longitude - user_location.longitude) < threshold
						) {
							alert('find!');
							return false;
						} else {
							return true;
						}
					})
			);
		},
		[ user_location, events ]
	);
	useEffect(
		() => {
			let watchID = null;
			Permissions.askAsync(Permissions.LOCATION)
				.then((permission) => {
					if (permission.status === 'granted') {
						// watchID = navigator.geolocation.watchPosition(
						// 	(location) => {
						// 		dispatch({
						// 			type: USER_LOCATION_CHANGE_REQUEST,
						// 			data: {
						// 				latitude: location.coords.latitude,
						// 				longitude: location.coords.longitude
						// 			}
						// 		});
						// 	},
						// 	(error) => {
						// 		console.log(error);
						// 	},
						// 	{
						// 		enableHighAccuracy: true,
						// 		timeout: 20000,
						// 		maximumAge: 0,
						// 		distanceFilter: 1
						// 	}
						// );
						Location.watchPositionAsync(
							{
								enableHighAccuracy: true,
								timeInterval: 500
							},
							(location) => {
								dispatch({
									type: USER_LOCATION_CHANGE_REQUEST,
									data: {
										latitude: location.coords.latitude,
										longitude: location.coords.longitude
									}
								});
							}
						);
					} else {
						console.warn('PERMISSION DENIED');
					}
				})
				.catch((e) => console.error(e));
		},
		[ user_location ]
	);

	const onRegionChange = (region) => {
		dispatch({
			type: USER_LOCATION_CHANGE_REQUEST,
			data: {
				latitude: region.latitude,
				longitude: region.longitude
			}
		});
	};

	const onUserChange = (region) => {
		setLong(region.longitude);
		setLat(region.latitude);
	};

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				region={user_location}
				showsUserLocation
				followsUserLocation
				onRegionChange={onRegionChange}
			>
				{events &&
					events.map((v) => {
						return (
							<Marker
								key={`${v.latitude}${v.longitude}`}
								coordinate={{
									longitude: v.longitude,
									latitude: v.latitude
								}}
								image={require('../../assets/pokeball.png')}
							/>
						);
					})}
			</MapView>
			<Text>{user_location.latitude}</Text>
			<Text>{user_location.longitude}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	bubble: {
		backgroundColor: 'rgba(255,255,255,0.7)',
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderRadius: 20
	}
});

export default Map;
