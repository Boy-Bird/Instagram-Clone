import React, {useState} from "react";
import { View, Text, Touchable, StyleSheet, Image } from "react-native";
import {Divider} from 'react-native-elements'
import { TouchableOpacity } from "react-native";

export const bottomTabIcons = [
  {
    name: 'Home',
    active: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
    inactive: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
  },
  {
    name: 'Search',
    active: 'https://th.bing.com/th/id/OIP.BFcCQGim37JaxRJXefacawAAAA?pid=ImgDet&rs=1',
    inactive: 'https://th.bing.com/th/id/OIP.BFcCQGim37JaxRJXefacawAAAA?pid=ImgDet&rs=1',
  },
  {
    name: 'Reels',
    active: 'https://th.bing.com/th/id/OIP.2IA3ay8TpTpfB-v9ndB61QHaHa?pid=ImgDet&w=696&h=696&rs=1',
    inactive: 'https://th.bing.com/th/id/OIP.2IA3ay8TpTpfB-v9ndB61QHaHa?pid=ImgDet&w=696&h=696&rs=1',
  },
  {
    name: 'Shop',
    active: 'https://static.vecteezy.com/system/resources/previews/000/439/724/original/shutdown-vector-icon.jpg',
    inactive: 'https://static.vecteezy.com/system/resources/previews/000/439/724/original/shutdown-vector-icon.jpg',
  },
]

const BottomTabs = ({icons}) => {
  const [activeTab, setActiveTab] = useState('Home')

  const Icon = ({icon}) => (
    <TouchableOpacity onPress ={() => setActiveTab(icon.name)}>
      <Image 
        source={{uri: activeTab === icon.name? icon.active: icon.inactive}} 
        style={[
          styles.icon,
          icon.name==='Profile'?styles.profilePic(): null,
        ]}
      />
    </TouchableOpacity>
  )
  return (
    <View style={styles.wrapper}>
      {/* <Divider width={1} orientation='vertical' /> */}
      <View style={styles.container}>
      {/* <View> */}
        {icons.map((icon,index) => (
          <Icon key={index} icon={icon} />
        ))}
      {/* </View> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    position: 'absolute',
    width: '100%',
    bottom: '0%',
    zIndex: 999,
    backgroundColor: '#000',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    paddingTop: 10,
  },
  icon: {
    width: 30, 
    height: 30,
  },
  profilePic: (activeTab = '') =>({
    borderRadius: 50,
    borderWidth: activeTab==='Profile'?2:0,
    borderColor: "#fff",
  }),
})

export default BottomTabs