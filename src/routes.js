import {createStackNavigator} from "react-navigation";

import MainPage from "./pages/MainPage/main";
import Product from './pages/product';

export default createStackNavigator({
    Main: MainPage,
    Product
},{
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#DA552F"
        }, 
        headerTintColor:  "#FFF"
    }
} );