/* eslint-disable react-native/no-inline-styles */
import React,{useRef, useState, useEffect, useCallback} from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import SecondaryTopBar from '../Components/SecondaryTopAppbar';
import BottomSheetModal , { BottomSheetView }  from '@gorhom/bottom-sheet';

import { colors, dimensions } from '../Utils/values';
import { TextInput } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

import {Asset, ImageLibraryOptions, launchImageLibrary} from 'react-native-image-picker';
import { API_BASE_URL } from '../Utils/NgRockLink';


const screenWidth = dimensions.screenWidth;
const screenHeight = dimensions.screenHeight;


type Props = {
  title: string;
  value: string;
  onAction: (value:string,title:string) => void;
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
};




const BottomSheetRenderdComponent: React.FC<Props> = ({ title, value , onAction , bottomSheetRef}) => {
    const [newValue,SetNewVal] = useState('');
    useEffect(() => {
      SetNewVal('');
    },[value]);

    const onAccountDelete = () => {
      bottomSheetRef.current?.close();
    };
    const onAccountNotDelete = () => {
      bottomSheetRef.current?.close();
    };

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return(

      //Deleting Account Section
      title === 'Delete Account' ?
      <View>
        <View style={styles.WanringiconContainer}>
          <Icon name={'times-circle-o'} size={65} color={colors.ErrorColor}/>
        </View>

        <View style={styles.WanringiconContainer}>
          <Text style={[styles.BottomSheetTitle, {textAlign :'center',fontSize:16}]}>You're going to delete your 'Account' </Text>
        </View>

        <View style={styles.DeleteAcoountBtnsContainer}>
          <TouchableOpacity
            style={[styles.BottomSheetButton,{width : '30%'}]}
            onPress={()=>{onAccountNotDelete();}}
          >
            <Text style={styles.ButtonText}>No, Keep it</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.BottomSheetButton,{width : '30%', backgroundColor:colors.ErrorColor}]}
            onPress={()=>{onAccountDelete();}}
          >
            <Text style={styles.ButtonText}>Yes, Delete!</Text>
          </TouchableOpacity>
        </View>
      </View> :

      //Dark Mode Section
      title === 'Dark Mode' ?
      <View>
        <View style={styles.DarkModeSwitchContainer}>
          <Text style={styles.BottomSheetTitle}>{title}</Text>
          <Switch
            trackColor={{ false: colors.TextColor, true: colors.secondary }}
            thumbColor={ colors.primaryColor}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View> :

      //Data Section
      <View>
        <View style={styles.BottomSheetTitleContainer}>
          <Text style={styles.BottomSheetTitle}>{title}:</Text>
          <Text style={styles.BottomSheetTitle}>{value}</Text>
        </View>

        <TextInput
          style={styles.BottomSheetInput}
          placeholder={title}
          value={newValue}
          placeholderTextColor={colors.primaryColor}
          onChangeText={(e) => SetNewVal(e)}
          returnKeyType="done"
        />

        <TouchableOpacity style={styles.BottomSheetButton} onPress={()=>{onAction(newValue,title);}}>
          <Text style={styles.ButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  };


const ProfileScreen = () => {
  const userId = 1;

  const bottomSheetRef =  useRef<BottomSheetModal >(null);
  const [snapPoints, setSnapPoints] = useState(['25%', '30%', '35%']);


  const [userName,setUserName] = useState('string');
  const [phoneNumber,setPhoneNumber] = useState('string');
  const [email,setEmail] = useState('string');
  const [password,setPassword] = useState('string');
  const [profilePic,setProfilePic] = useState('string');
  const [createAt,setCreateAt] = useState('string');

  const [tempVal,setTempVal] = useState('Undefined');
  const [temptitle,setTempTitle] = useState('Undefined');

  useEffect(() => {
  const onKeyboardShow = () => {
    setSnapPoints(['40%', '62%', '62%']);
  };

  const onKeyboardHide = () => {
    setSnapPoints(['25%', '30%', '35%']);
  };


  const showSub = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
  const hideSub = Keyboard.addListener('keyboardDidHide', onKeyboardHide);

  return () => {
    showSub.remove();
    hideSub.remove();
  };
}, []);



useFocusEffect(
  useCallback(() => {
    const fetchData = async () => {
      try {
          const ProfileData = await axios.get(`${API_BASE_URL}/api/Profile/GetUserProfile/${userId}`);
          setUserName(ProfileData.data.username);
          setPhoneNumber(ProfileData.data.phonE_NUMBER);
          setEmail(ProfileData.data.email);
          setPassword(ProfileData.data.hashedpassword);
          setProfilePic(ProfileData.data.profilepic);
          setCreateAt(ProfileData.data.createD_AT);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [userId])
);




  const openSheet = (title:string)=>{
    setTempTitle(title);

    if(title === 'User Name')
      {setTempVal(userName);}
    else if(title === 'Phone Number')
      {setTempVal(phoneNumber);}
    else if(title === 'Email')
      {setTempVal(email);}
    else if(title === 'Password')
      {setTempVal(password);}

    bottomSheetRef.current?.expand();
  };


  const onDone = (value:string,title:string)=>{
    if(title === 'User Name')
    {
      if(value.trim() !== ''){
        setUserName(value);
      }
    }
    else if(title === 'Phone Number')
    {
      if(value.trim() !== ''){
        setPhoneNumber(value);
      }
    }
    else if(title === 'Email')
    {
      if(value.trim() !== ''){
        setEmail(value);
      }
    }
    else if(title === 'Password')
    {
      if(value.trim() !== ''){
      setPassword(value);
      }
    }

    setTempVal('Undefined');
    setTempTitle('Undefined');
    bottomSheetRef.current?.close();
    Keyboard.dismiss();
  };

 const pickImage = () => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 1,
    selectionLimit: 1,
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error:', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const image: Asset = response.assets[0];

      if (image.uri && image.fileName && image.type) {
        setProfilePic(image.uri!);
      } else {
        console.error('Invalid image asset');
      }
    }
  });
};



  return (
    <SafeAreaView style={styles.container}>

      <SecondaryTopBar userProfileInfo={{
    userid: userId,
    username: userName,
    phonE_NUMBER: phoneNumber,
    email: email,
    hashedpassword: password,
    profilepic: profilePic,
    createD_AT: createAt,
    iS_ACTIVE: 'Y',
  }}/>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: screenHeight * 0.06 }}>
        <View style={styles.ImageContainer}>
          <Image source={{uri:profilePic}}
          style={styles.image}
          />
          <TouchableOpacity
            style={styles.ChangeImageContainer}
            activeOpacity={0.3}
            onPress={pickImage}
          >
            <Icon
              name={'camera'}
              size={18}
              color={colors.backgroundColor}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.accountinfoContainer}>
          <Text style={styles.containersTitle}>ACCOUNT INFORMATIONS</Text>

          <View style={styles.infoContainer}>

            <TouchableOpacity
              style={styles.SingleinfoContainer}
              activeOpacity={0.5}
              onPress={()=>{openSheet('User Name');}}
            >
              <Text style={styles.infoText}>User Name</Text>
              <Icon
              name={'chevron-right'}
              size={14}
              color={colors.primaryColor}
            />
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.SingleinfoContainer}
              activeOpacity={0.5}
              onPress={()=>{openSheet('Phone Number');}}
            >
              <Text style={styles.infoText}>Phone Number</Text>
              <Icon
              name={'chevron-right'}
              size={14}
              color={colors.primaryColor}
            />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.SingleinfoContainer}
              activeOpacity={0.5}
              onPress={()=>{openSheet('Email');}}
            >
              <Text style={styles.infoText}>Email</Text>
              <Icon
              name={'chevron-right'}
              size={14}
              color={colors.primaryColor}
            />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.SingleinfoContainer}
              activeOpacity={0.5}
              onPress={()=>{openSheet('Password');}}
            >
              <Text style={styles.infoText}>Password</Text>
              <Icon
              name={'chevron-right'}
              size={14}
              color={colors.primaryColor}
            />
            </TouchableOpacity>

            <TouchableOpacity style={styles.SingleinfoContainer} activeOpacity={0.5}>
              <Text style={styles.infoText}>Create Date</Text>
              <Text>{createAt.split('T')[0]}</Text>
            </TouchableOpacity>


          </View>
        </View>



        <View style={styles.BlockedUsersContainer}>
          <Text style={styles.containersTitle}>General</Text>

          <View style={styles.infoContainer}>

            <TouchableOpacity
              style={styles.SingleinfoContainer}
              activeOpacity={0.5}
              onPress={()=>{}}
            >
              <Text style={styles.infoText}>Blocked Users</Text>
              <Icon
              name={'chevron-right'}
              size={14}
              color={colors.primaryColor}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.SingleinfoContainer}
              activeOpacity={0.5}
              onPress={()=>{openSheet('Dark Mode');}}
            >
              <Text style={styles.infoText}>Dark Mode</Text>
              <Icon
              name={'chevron-right'}
              size={14}
              color={colors.primaryColor}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.SingleinfoContainer}
              activeOpacity={0.5}
              onPress={()=>openSheet('Delete Account')}
              >
              <Text style={styles.infoText}>Delete Account</Text>
              <Icon
              name={'chevron-right'}
              size={14}
              color={colors.primaryColor}
              />
            </TouchableOpacity>
          </View>

        </View>


        <TouchableOpacity
          style={styles.Logoutbutton}
          activeOpacity={0.5}
          onPress={() => bottomSheetRef.current?.expand()}
        >
              <Text style={styles.ButtonText}>Log out</Text>
              <Icon
              name={'sign-out'}
              size={20}
              color={'#fff'}
              />
        </TouchableOpacity>

      </ScrollView>
      <BottomSheetModal
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          onClose={()=>{ setTempVal('Undefined'); setTempTitle('Undefined');}}
          keyboardBehavior={'interactive'}
          keyboardBlurBehavior="restore"
          style={styles.BottomSheetContainer}
        >
          <BottomSheetView >
            <BottomSheetRenderdComponent title={temptitle} value={tempVal} onAction = {onDone} bottomSheetRef = {bottomSheetRef}/>
          </BottomSheetView>
        </BottomSheetModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView:{
    flex: 1,
    backgroundColor: '#fff',
  },
  ImageContainer:{
    width:'100%',
    height:screenWidth * 0.50,
    justifyContent:'center',
    marginTop:'10%',
  },
  image:{
    width:screenWidth * 0.45,
    maxWidth:screenWidth * 0.45,
    minWidth:screenWidth * 0.45,
    height:screenWidth * 0.45,
    borderRadius:screenWidth * 0.45 / 2,
    elevation:10,
    alignSelf:'center',
  },
  ChangeImageContainer:{
    backgroundColor:colors.primaryColor,
    height:'21%',
    aspectRatio:1,
    borderRadius: 999,
    justifyContent:'center',
    alignItems:'center',
    marginStart:'55%',
    marginTop:'-10%',
    zIndex:100,
  },
  accountinfoContainer:{
    marginTop:'7%',
    height:screenWidth * 0.60,
    paddingHorizontal:'4%',
  },
  containersTitle:{
    fontSize:12,
    color:colors.primaryColor,
    fontWeight:'500',
    marginBottom:'2%',
  },
  infoContainer:{
    height:'100%',
    borderRadius:12,
    backgroundColor:'#f5f5f5',
    paddingHorizontal:'5%',
    paddingVertical:'1%',
    elevation:5,
  },
  SingleinfoContainer:{
    height:screenWidth * 0.118,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomWidth:2,
    borderBlockColor:'#e8e8e8',
    alignItems:'center',
  },
  infoText:{
    fontSize:14,
    fontWeight:'500',
    color:colors.primaryColor,
  },
  BlockedUsersContainer:{
    marginTop:'10%',
    paddingHorizontal:'4%',
    height:screenWidth * 0.36,
  },
  Logoutbutton:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'14%',
    marginHorizontal:'4%',
    paddingVertical:'1%',
    borderRadius:12,
    backgroundColor:colors.primaryColor,
    elevation:5,
    height:screenWidth * 0.15,
  },
  ButtonText:{
    color:'#fff',
    fontSize:13,
    fontWeight:'bold',
    marginHorizontal:'2%',
  },
  BottomSheetContainer:{
    flex:1,
    borderColor:'#edebeb',
    borderRadius:16,
    borderWidth:1,
    elevation:5,
    paddingHorizontal:'4%',
  },
  BottomSheetTitleContainer:{
    width:'100%',
    height:screenWidth * 0.118 ,
    flexDirection:'row',
    color:colors.primaryColor,
    borderBottomWidth:2,
    borderColor:'#edebeb',
    alignItems:'center',
  },
  BottomSheetTitle:{
    color:colors.primaryColor,
    fontSize:14,
    fontWeight:'500',
    marginRight:'2%',
  },
  BottomSheetInput:{
    height:screenWidth * 0.118,
    borderBottomWidth:2,
    borderColor:'#edebeb',
    color:colors.primaryColor,
  },
  BottomSheetButton:{
    height:screenWidth * 0.118,
    width:'50%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginTop:'10%',
    paddingVertical:'1%',
    borderRadius:12,
    backgroundColor:colors.primaryColor,
    elevation:5,
  },
  WanringiconContainer:{
    justifyContent:'center',
    alignItems:'center',
    paddingTop:'2%',
  },
  DeleteAcoountBtnsContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
  },
  DarkModeSwitchContainer:{
    width:'100%',
    height:screenWidth * 0.118 ,
    flexDirection:'row',
    color:colors.primaryColor,
    justifyContent:'space-between',
    borderBottomWidth:2,
    borderColor:'#edebeb',
    alignItems:'center',
  },
});

export default ProfileScreen;
