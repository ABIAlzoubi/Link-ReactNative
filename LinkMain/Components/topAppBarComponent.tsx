/* eslint-disable jsx-quotes */
import React from 'react';
import {
    Dimensions,
    View,
    StyleSheet,
    Text,
    TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../Utils/values';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const topAppBar = () => {
    return(
        <View style={styles.AppBar}>
            <View style={styles.container}>
                <Text style={styles.Title}>Link</Text>
                <View style={styles.SearchContainer}>
                    <TextInput numberOfLines={1} multiline={false} placeholderTextColor={colors.TextColor} placeholder='Search...' style={styles.searchInput}/>
                    <Icon name="search" size={18} color={colors.primaryColor} />
                </View>
            </View>
        </View>
    );
};
export default topAppBar;

const styles = StyleSheet.create({
    AppBar:{
    height: screenHeight * 0.07,
    width: screenWidth,
    display:'flex',
    alignItems:'center',
    marginBottom:screenWidth * 0.01,
    paddingHorizontal:screenWidth * 0.02,
},
container:{
    height:'100%',
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
},
Title:{
    fontSize:screenWidth * 0.11,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: colors.primaryColor,
},
SearchContainer:{
    height:screenWidth * 0.11,
    width:'77%',
    minWidth:'77%',
    maxWidth:'77%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderColor:'lightgray',
    borderWidth:1,
    borderRadius:999,
    padding:0,
    paddingHorizontal:screenWidth * 0.03,
},
searchInput:{
    fontSize:13,
    maxWidth:'95%',
    minWidth:'95%',
    width:'95%',
    height:'100%',
    color:'black',
    writingDirection: 'auto',
},
});
