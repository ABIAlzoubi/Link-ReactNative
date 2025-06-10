/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Alert,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatListComponent from '../Components/chatListComponent';
import OnlineComponent from '../Components/onlineComponent';
import { SwipeListView } from 'react-native-swipe-list-view';
import LottieView from 'lottie-react-native';
// const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
const HomeScreen = () =>{

    const [playLootie,setPlayLootie] = useState(false);


    const [chats, setChats] = useState([
        { id: 1, name: 'Anas Bassam' },
        { id: 2, name: 'Sara Ali' },
        { id: 3, name: 'Bassam Layla' },
        { id: 4, name: 'Bassam Layla' },
        { id: 5, name: 'Bassam Layla' },
        { id: 6, name: 'Bassam Layla' },
        { id: 7, name: 'Anas Bassam' },
        { id: 8, name: 'Sara Ali' },
        { id: 9, name: 'Bassam Layla' },
        { id: 10, name: 'Bassam Layla' },
        { id: 11, name: 'Bassam Layla' },
        { id: 12, name: 'Bassam Layla' },
    ]);

    const handleDelete = (item:number) => {
        setChats((prev) => prev.filter((chat) => chat.id !== item));

    };

    const handleArchive = (item:number) => {
         Alert.alert('Archived', `Chat ${item} archived`);
    };


  return(
    <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({}) => (
              <TouchableOpacity
                  activeOpacity={1} onPress={() => {}}>
                  <OnlineComponent/>
              </TouchableOpacity>
          )}
          horizontal
          style={styles.onlineList}
        />

        <SwipeListView
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity
                activeOpacity={1} onPress={() => {}}>
                <ChatListComponent chat={item} />
            </TouchableOpacity>
        )}


        renderHiddenItem={({item}) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backLeftBtn, styles.backBtn]}
                onPress={() => handleArchive(item.id)}
            >
            <Text style={styles.backTextWhite}>Archive</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={[styles.backRightBtn, styles.backBtn]}
                onPress={() => handleDelete(item.id)}
            >
            <LottieView
                source={require('../Assets/Animations/trashAnimation.json')} // your animation file
                autoPlay = {playLootie}
                loop={false}
                style={{ width: 80, height: 80 }}
            />
            </TouchableOpacity>

        </View>
        )}
        leftOpenValue={screenWidth * 0.4}
        rightOpenValue={-screenWidth * 0.4}
        swipeToOpenPercent={screenWidth * 0.15}
        disableRightSwipe={false}
        disableLeftSwipe={false}
        showsVerticalScrollIndicator={false}
        closeOnRowPress={true}
        onRowOpen={() => setPlayLootie(true)}
        onRowDidOpen={() => setPlayLootie(false)}
      />
    </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
     safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  backBtn: {
    width: 75,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  backLeftBtn: {
    backgroundColor: '#4caf50',
  },
  backRightBtn: {
    backgroundColor: '#f44336',
  },
  backTextWhite: {
    color: '#fff',
    fontWeight: 'bold',
  },
  onlineList:{
    height: screenWidth * 0.3,
    width:'100%',
  },
});

