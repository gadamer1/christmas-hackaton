import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import EventScreen from '../Screens/EventScreen';
import TabNavigator from './TabsNavigator';

const StackNavigator = createStackNavigator({
	TabNavigator: { screen: TabNavigator },
	event: EventScreen
});

export default createAppContainer(StackNavigator);
