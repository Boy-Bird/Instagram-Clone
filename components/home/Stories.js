import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet} from 'react-native'
import { USERS } from '../../data/users'


const Stories = () => {
  return (
    <View style={{marginBottom: 13}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={story.id} style={{alignItems: 'center'}}>

          <Image source = {{uri: story.image}}
          // source = {require(' ')}
          style={styles.story}
          />
          <Text style={{color:'white'}}>{story.user}</Text>
          </View>
        ))}
        {/* {USERS.map((story, index) => (
          <View key = {story.id} style={{alignItems: 'center'}}>

            <Image source={{uri: story.image}}
              style = {styles.story}
            />
            <Text style={{color:'white'}}>{story.user}</Text>
          </View>
        ))} */}
  

      </ScrollView>
        
    </View>
  )
}

const styles = StyleSheet.create({
  story: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 5,
    borderWidth: 3,
    borderColor: '#2ADFBB',
  },
})

export default Stories