import React, {Component} from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from './styles';
import {Linking} from 'react-native';
import api from '../services/api';


export default class Main extends Component{
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
    
    callDummyGetProducts = async (page) => {
    const apiResponse = await api.get(`/products?page=${page}`);
    console.log(apiResponse);
    const {docs, pages} = apiResponse.data;
    const dummyData = {_id: 1, title: 'titulo', description: 'descricao', url: 'https://google.com'};

    const successResponse = {
        ok: true,
        data: {docs, pages, page},
        error: undefined,
    };

    return successResponse;

}

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

    
    loadProducts = async (page = 1) => {
        const response = await this.callDummyGetProducts(page);// await api.get(`/products?page=${page}`);

        if (response.ok) { 
            const {data} = response;
            this.handleSuccess(data);

        }
            
        else{ 
            const {error} = response;
            this.handleError(error);
        }

       // const {docs, ...productInfo} = response.data;
    
       // this.setState({ docs: [...this.state.docs, ...docs], productInfo, page });
    };
    

    
    loadMore = async () => {
        console.log('loadMore');
        const {page, totalPages} = this.state;
        const lastPage = totalPages;

        if(page == lastPage) return;


        const nextPage = page + 1;
           await this.loadProducts(nextPage) 

    /*

    if(page == productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);

    */ };

    onPressProduct = (item) => 
    
    {   
      
        Linking.openURL(item.url);
    
    //  {this.props.navigation.navigate('Product', {product: item});
}

    renderItem = ({ item }) => (
         
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productDescription}>{item.url}</Text>
            <TouchableOpacity style={styles.productButton} 
            
            onPress={() => { this.onPressProduct(item)}}>

            <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    );
    
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
}   
