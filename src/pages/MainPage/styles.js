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
    }
});

export default styles;
