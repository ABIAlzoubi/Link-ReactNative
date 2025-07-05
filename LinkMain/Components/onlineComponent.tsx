import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


type ActiveUser = {
  userID: number;
  username: string;
  profilepic: string;
};

const onlineComponent = ({ AcUser }: { AcUser: ActiveUser }) =>
    {
        return(
            <View style={styles.container}>
                <Image source={{uri: AcUser.profilepic}} style={styles.PrevImage}/>
                <View style={styles.onlineIcon} />
                <Text numberOfLines={2}  style={styles.NameText}>{AcUser.username}</Text>
            </View>
        );
    };
    export default onlineComponent;


const styles = StyleSheet.create({
container: {
    height: screenHeight * 0.09,
    backgroundColor:'#fff',
    paddingLeft:screenWidth * 0.03,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    flex: 1,
    borderColor:'#edebeb',
    borderBottomWidth:1,
  },
  PrevImage:{
    width:screenWidth * 0.160,
    height:screenWidth * 0.160,
    borderRadius:(screenWidth * 0.160) / 2,
    borderColor:'#edebeb',
    borderWidth:0.3,
  },
  onlineIcon:{
    width:screenWidth * 0.045,
    height:screenWidth * 0.045,
    borderWidth:2,
    borderColor:'#fff',
    borderRadius:(screenWidth * 0.045) / 2,
    backgroundColor:'#04d60b',
    marginTop:-screenWidth * 0.05,
    marginLeft:screenWidth * 0.12,
  },
  NameText:{
    fontSize:12,
    maxWidth:screenWidth * 0.15,
    textAlign:'center',
    color:'gray',
  },
});
