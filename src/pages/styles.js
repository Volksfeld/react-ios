import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    loadingScreen:{
        flex: 1,
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        justifyContent: "center",

    },
    loadingText: {
        fontSize: 25,
        padding: 20,
        borderWidth: 3,
        borderColor: '#DA552f',
        borderRadius: 10,




    },
    list:{
        padding: 20,
    },
    productContainer:{
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20

    },
    productTitle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2
    },
    productDescription:{
        fontSize: 16,
        color: '#999',
        marginTop: 3,
        lineHeight: 24

    },
    productButton:{
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#Da552f',
        backgroundColor: "transparent",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    productButtonText:{
        fontSize: 16,
        color: '#Da552f',
        fontWeight: 'bold'
    }
});

export default styles;