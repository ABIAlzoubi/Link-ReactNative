import React from 'react';
import {Text, View ,StyleSheet, Dimensions, Image } from 'react-native';
import { currentUserID } from '../Utils/values';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


type Chat = {
  chat_id: number;
  name: string;
  is_active: string;
  message_id : number;
  chat_type: string;
  content: string;
  sent_at: string;
  userid: number;
  unreaded: number;
  profilepic: string;
};


const chatListComponent = ({ chat }: { chat: Chat }) => {

    const d = new Date();
    return (
        <View style={styles.container}>

            <Image source={chat.chat_type === 'group' ? { uri: 'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_640.png' } : { uri: chat.profilepic }} style={styles.PrevImage}/>


            {chat.is_active.toUpperCase() === 'Y' ? <View style={styles.onlineContainer}/> : <></>}
            <View style={styles.onlineContainer}/>

            <View style={styles.detailsContainer}>

                <View style={styles.infoContainer}>
                    <Text style={styles.nameText}>{chat.name}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.messageText}>
                      {currentUserID === chat.userid ? `You: ${chat.content}` : chat.content}
                    </Text>
                </View>

                <View style={styles.dateContainer}>
                  <Text numberOfLines={1} style={styles.messageDateText}>{ d.toISOString().split('T')[0]  === chat.sent_at.split('T')[0] ? chat.sent_at.split('T')[1].substring(0, 5) : chat.sent_at.split('T')[0]}</Text>
                  {chat.unreaded > 0 && (
                    <View style={styles.messageCountContainer}>
                      <Text style={styles.messageCountText}>{chat.unreaded}</Text>
                    </View>
                  )}
                </View>

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
    paddingTop:'2%',
    marginLeft:'2.5%',
    borderColor:'#edebeb',
    borderBottomWidth:1,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  nameText:{
    fontWeight:'bold',
    fontSize:15,
    maxWidth:'100%',
    maxHeight:'50%',
    minWidth:'70%',
  },
  messageText:{
    fontSize:13,
    color:'gray',
    maxWidth:'97%',
    maxHeight:'50%',
  },
  messageCountContainer:{
    height:screenWidth * 0.06,
    width:screenWidth * 0.06,
    marginTop:'13%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'red',
    backgroundColor:'#f5000b',
    borderRadius:(screenWidth * 0.06) / 2,
  },
  onlineContainer:{
    backgroundColor:'#04d60b',
    width:screenWidth * 0.04,
    height:screenWidth * 0.04,
    borderRadius:(screenWidth * 0.04) / 2 ,
    marginTop:screenWidth * 0.09,
    marginStart:-screenWidth * 0.04,
    borderColor:'white',
    borderWidth:2,
  },
  infoContainer:{
    minWidth:'79%',
    maxWidth:'79%',
    width:'79%',
    height:'100%',
  },
  dateContainer:{
    display:'flex',
    alignItems:'center',
    width:'21%',
    minWidth:'21%',
    maxWidth:'21%',
  },
  messageCountText:{
    fontSize:14,
    fontWeight:'bold',
    color:'#fff',
  },
  messageDateText:{
    fontSize:12,
    color:'gray',
    maxWidth:'100%',
  },

});
