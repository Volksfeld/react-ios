import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from './styles';



const ListItem = ({item, onPressProduct}) =>{
     
        return(
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productDescription}>{item.url}</Text>
            
            <TouchableOpacity style={styles.productButton} 
                onPress={() => { onPressProduct(item);}}>
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
        );}
export default ListItem;
 