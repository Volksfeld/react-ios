import React from 'react';
import {Text} from 'react-native';
import {WebView} from 'react-native';

const Product = ({ navigation }) => (

    <WebView source={{ uri: navigation.state.params.product.url}}/>
    
    
    );

Product.navigationOptions = ({navigation}) => ({
    title: navigation.state.params.product.title
});

export default Product