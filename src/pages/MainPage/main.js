import React, {Component} from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from './styles';
import ListItem from './components/ListItem';
import {Linking} from 'react-native';
import api from '../../services/api';


export default class MainPage extends Component{

    
    static navigationOptions = {
        title: "Produtos legais"
    };

    
    state = {
        loading: true,
        totalPages: 2,
        products: [],
        page: 1,
    };

   
    async componentDidMount(){
       await this.loadProducts();
    }
    
    // API SYNC -------------------------------------------
    getProducts = async (page) => {
    const apiResponse = await api.get(`/products?page=${page}`);
    console.log(apiResponse);
    const {docs, pages} = apiResponse.data;

    const successResponse = {
        ok: true,
        data: {docs, pages, page},
        error: undefined,
    };

    return successResponse;

}

    // HANDLES --------------------------------------------
    handleError = (error) => {
        this.setState(prevState => ({
            ...prevState,
            loading: false,
            products: undefined,
            error,
          }));
    }
   
    handleSuccess = (data) => {
        const {docs, pages, page} = data;
        this.setState(prevState => ({
            ...prevState,
            page,
            totalPages: pages,
            loading: false,
            products: [...prevState.products, ...docs],
            error: undefined,
        }));
        
    }

    // LOADS (PAGE) -----------------------------------------
    loadProducts = async (page = 1) => {
        const response = await this.getProducts(page);
      
    // SHOOTS handleSucces
        if (response.ok) { 
            const {data} = response;
            this.handleSuccess(data);

        }
    // SHOOTS handleError        
        else{ 
            const {error} = response;
            this.handleError(error);
        }

    };
    
    loadMore = async () => {
        console.log('loadMore');
        const {page, totalPages} = this.state;
        const lastPage = totalPages;

        if(page == lastPage) return;


        const nextPage = page + 1;
           await this.loadProducts(nextPage) 

    };

    //ON PRESS
    onPressProduct = (item) =>     
    {   
        Linking.openURL(item.url);
}
    //RENDER ----------------------------------------------
    render(){
    const {loading, error } = this.state;
    if (loading){
        return this.renderLoading();
    }
    if(error !== undefined){
        return  this.renderError();
    }
    return this.renderContent();
}
    
    renderItem = ({item})=> {
        
        return (
        <ListItem item = {item} onPressProduct = {this.onPressProduct}/>
        );

    }     

  
    renderLoading = () => { 
        console.log("loading");
        return(
        <View style={styles.loadingScreen}>
            <Text style={styles.loadingText}>Carregando ...</Text>
        </View>
    );
}   
    
    renderError = () => {
        console.log("error");    
        return(
        
        <View>
            <Text>Deu erro pai</Text>
        </View>

    );
}
    
    renderContent = () => {
        console.log("content");
       const {products} = this.state;
        return(
            <View style={styles.container}>
            
            <FlatList 
               contentContainerStyle={styles.list}
               data={products}
               keyExtractor={item => item._id}
               renderItem={this.renderItem}
            
               onEndReached={this.loadMore}
               onEndReachedThreshold={0.1}
               />
           </View>
        );
    }

}   
