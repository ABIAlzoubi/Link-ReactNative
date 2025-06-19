import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SecondaryTopBar from '../Components/SecondaryTopAppbar';
import { colors, dimensions } from '../Utils/values';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = dimensions.screenWidth;
const screenHeight = dimensions.screenHeight;


const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.containe}>
      <SecondaryTopBar />
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: screenHeight * 0.06 }}>
        <View style={styles.ImageContainer}>
          <Image source={require('../Assets/Images/test.png')}
          style={styles.image}
          />
          <TouchableOpacity
            style={styles.ChangeImageContainer}
            activeOpacity={0.3}
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

            <TouchableOpacity style={styles.SingleinfoContainer} activeOpacity={0.5}>
              <Text style={styles.infoText}>User Name</Text>
              <Icon
              name={'chevron-right'}
              size={14}
              color={colors.primaryColor}
            />
            </TouchableOpacity>


            <TouchableOpacity style={styles.SingleinfoContainer} activeOpacity={0.5}>
              <Text style={styles.infoText}>Phone Number</Text>
              <Icon
              name={'chevron-right'}
              size={14}
              color={colors.primaryColor}
            />
            </TouchableOpacity>

            <TouchableOpacity style={styles.SingleinfoContainer} activeOpacity={0.5}>
              <Text style={styles.infoText}>Email</Text>
              <Icon
              name={'chevron-right'}
              size={14}
              color={colors.primaryColor}
            />
            </TouchableOpacity>

            <TouchableOpacity style={styles.SingleinfoContainer} activeOpacity={0.5}>
              <Text style={styles.infoText}>Password</Text>
              <Icon
              name={'chevron-right'}
              size={14}
              color={colors.primaryColor}
            />
            </TouchableOpacity>

            <TouchableOpacity style={styles.SingleinfoContainer} activeOpacity={0.5}>
              <Text style={styles.infoText}>Create Date</Text>
            </TouchableOpacity>


          </View>
        </View>



        <View style={styles.BlockedUsersContainer}>
          <Text style={styles.containersTitle}>General</Text>

          <View style={styles.infoContainer}>

            <TouchableOpacity style={styles.SingleinfoContainer} activeOpacity={0.5}>
              <Text style={styles.infoText}>Blocked Users</Text>
              <Icon
              name={'chevron-right'}
              size={14}
              color={colors.primaryColor}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.SingleinfoContainer} activeOpacity={0.5}>
              <Text style={styles.infoText}>Dark Mode</Text>
              <Icon
              name={'chevron-right'}
              size={14}
              color={colors.primaryColor}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.SingleinfoContainer} activeOpacity={0.5}>
              <Text style={styles.infoText}>Delete Account</Text>
              <Icon
              name={'chevron-right'}
              size={14}
              color={colors.primaryColor}
              />
            </TouchableOpacity>
          </View>

        </View>


        <TouchableOpacity style={styles.Logoutbutton} activeOpacity={0.5}>
              <Text style={styles.ButtonText}>Log out</Text>
              <Icon
              name={'sign-out'}
              size={20}
              color={'#fff'}
              />
        </TouchableOpacity>



      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containe:{
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
});

export default ProfileScreen;
