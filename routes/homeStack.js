import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import ReviewDetails from '../screens/reviewDetails';


const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'ToDo',
            headerStyle: {
                backgroundColor:'coral'
            }
        }
    },
    ReviewDetails: {
        screen: ReviewDetails,
        navigationOptions: {
            title: 'ToDo Details',
            headerStyle: {
                backgroundColor:'coral'
            }
        }
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack); 