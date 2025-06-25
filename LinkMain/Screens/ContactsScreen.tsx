import React, { useRef } from 'react';
import {  SectionList, StyleSheet, Text, TextInput,  TouchableOpacity,  View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SecondaryTopBar from '../Components/SecondaryTopAppbar';
import ContactView from '../Components/contactsComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../Utils/values';
import { dimensions } from '../Utils/values';

const screenHeight = dimensions.screenHeight;
const screenWidth = dimensions.screenWidth;



type Contact = {
  name: string;
  id: string;
};

type SectionData = {
  title: string;
  data: Contact[];
};


const contactList: Contact[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Adam' },
  { id: '3', name: 'Bob' },
  { id: '4', name: 'Charlie' },
  { id: '5', name: 'David' },
  { id: '6', name: 'Daniel' },
  { id: '7', name: 'Eve' },
  { id: '8', name: 'Zack' },
  { id: '9', name: 'Alice' },
  { id: '10', name: 'Adam' },
  { id: '11', name: 'Bob' },
  { id: '12', name: 'Charlie' },
  { id: '13', name: 'David' },
  { id: '14', name: 'Daniel' },
  { id: '15', name: 'Eve' },
  { id: '16', name: 'Zack' },
  { id: '17', name: 'Zack' },
  { id: '18', name: 'Zack' },
  { id: '19', name: 'Zack' },
  { id: '20', name: 'alice' },
];

const groupContactsByLetter = (contacts: Contact[]): SectionData[] => {
  const grouped: { [key: string]: Contact[] } = {};

  contacts.forEach(contact => {
    const letter = contact.name[0].toUpperCase();
    if (!grouped[letter]) {grouped[letter] = [];}
    grouped[letter].push(contact);
  });

  const sorted = Object.keys(grouped).sort();
  return sorted.map(letter => ({
    title: letter,
    data: grouped[letter].sort((a, b) => a.name.localeCompare(b.name)),
  }));
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');



const ContactsScreen = () => {

  const sections = groupContactsByLetter(contactList);
  const sectionListRef = useRef<SectionList<Contact>>(null);

  const scrollToSection = (letter:any) => {
    const index = sections.findIndex((section) => section.title === letter.toUpperCase());
    if (index !== -1 && sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex: index,
        itemIndex: 0,
        viewOffset: 0,
        animated: true,
      });
    }
  };


  return (
    <SafeAreaView style={styles.containe}>
      <SecondaryTopBar />

      <View style={styles.SearchContainer}>
        <TextInput
          numberOfLines={1}
          multiline={false}
          placeholderTextColor={colors.TextColor}
          placeholder="Search..."
          style={styles.searchInput}/>
          <Icon name="search" size={18} color={colors.primaryColor} />
      </View>

      <SectionList
        ref={sectionListRef}
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({}) => <ContactView/>}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        contentContainerStyle={{ paddingBottom: screenHeight * 0.06 }}
      />


      <View style={styles.azBar}>
        {alphabet.map((letter) => (
          <TouchableOpacity key={letter} onPress={() => scrollToSection(letter)}>
            <Text style={styles.azLetter}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>


    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  containe:{
    flex: 1,
    backgroundColor: '#fff',
  },
  SearchContainer:{
    height:screenWidth * 0.11,
    width:'95%',
    minWidth:'95%',
    maxWidth:'95%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderColor:'lightgray',
    borderWidth:1,
    borderRadius:999,
    padding:0,
    paddingHorizontal:screenWidth * 0.03,
    alignSelf:'center',
    marginVertical:screenWidth * 0.03,
  },
  onlineList:{
    flex:1,
    width:'100%',
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





  header: {
    paddingHorizontal: '5%',
    backgroundColor: '#edebeb',
    elevation:10,
    fontWeight:'bold',
    fontSize:15,
  },
  azBar: {
  position: 'absolute',
  right: 4,
  top:'23%',
  width: 20,
  alignItems: 'center',
  justifyContent:'center',
  zIndex: 10,
  pointerEvents: 'box-none',
  backgroundColor:colors.primaryColor,
  height:'72%',
  borderRadius:99,
  },
azLetter: {
    fontSize: 15,
    color: colors.backgroundColor,
    marginTop:'3%',
  },
});

export default ContactsScreen;
