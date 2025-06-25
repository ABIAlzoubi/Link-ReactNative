import React from 'react';
import {Text, View ,StyleSheet, Dimensions, Image } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const chatListComponent = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../Assets/Images/test.png')} style={styles.PrevImage}/>

            <View style={styles.detailsContainer}>

                    <Text style={styles.nameText}>Name</Text>

            </View>
        </View>
    );
};
export default chatListComponent;
const styles = StyleSheet.create({
container: {
    height: screenHeight * 0.09,
    backgroundColor:'#fff',
    paddingLeft:screenWidth * 0.035,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    flex: 1,
},
PrevImage:{
    width:screenWidth * 0.145,
    height:screenWidth * 0.145,
    borderRadius:(screenWidth * 0.145) / 2,
    borderColor:'#edebeb',
    borderWidth:0.3,
},
detailsContainer:{
    width:'82%',
    height:'100%',
    paddingBottom:'2%',
    marginLeft:'2.5%',
    borderColor:'#edebeb',
    borderBottomWidth:1,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
},
nameText:{
    fontWeight:'bold',
    fontSize:15,
    maxWidth:'100%',
    maxHeight:'50%',
    minWidth:'70%',
},

});
