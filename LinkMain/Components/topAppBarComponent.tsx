import React from 'react';
import {
    Dimensions,
    View,
    StyleSheet,
    Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const topAppBar = () => {
    return(
        <View style={styles.AppBar}>
            <View style={styles.container}>
                <Text style={styles.Title}>Link</Text>
            </View>
            <Icon name="search" size={30} color="#900" />
        </View>
    );
};
export default topAppBar;

const styles = StyleSheet.create({
    AppBar:{
    height: screenHeight * 0.1,
    width: screenWidth,
    backgroundColor:'red',
    display:'flex',
    alignItems:'center',
    borderColor:'#edebeb',
    borderBottomWidth:1,
},
container:{
    height:'50%',
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
},
Title:{
    fontSize:25,
    fontWeight:'bold',
},
});
