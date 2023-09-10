import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Divider } from 'react-native-elements'
import {firebase, db} from '../../firebase'

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/000/439/724/original/shutdown-vector-icon.jpg',
    likedImageUrl: 'https://static.vecteezy.com/system/resources/previews/000/439/724/original/shutdown-vector-icon.jpg',
  },
  {
    name: 'Comment',
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/000/439/724/original/shutdown-vector-icon.jpg',
  },
  {
    name: 'Share',
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/000/439/724/original/shutdown-vector-icon.jpg',
  },
  {
    name: 'Save',
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/000/439/724/original/shutdown-vector-icon.jpg',

  },
]

const Post = ({post}) => {
  const handleLike = post => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    )

    db.collection('users')
    .doc(post.owner_email)
    .collection('posts')
    .update({
      likes_by_users: currentLikeStatus 
      ? firebase.firestore.FieldValue.arrayUnion(
          firebase.auth().currentUser.email
        )
      : firebase.firestore.FieldValue.arrayRemove(
          firebase.auth().currentUser.email
      ),
    })
    .then(() => {
      console.log('Document successfully updated!')
    })
    .catch(error => {
      console.error('Error updating document: ', error)
    })
  }
  return (
    <View style={{marginBottom: 30}}>
      <Divider width={1} orientation='vertical' />
      <PostHeader post = {post} />
      <PostImage post = {post}/>
      
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <PostFooter post={post} handleLike={handleLike}/>
        <Likes post = {post}/>
        <Caption post = {post} />
        <CommentSection post ={post} />
        <Comments post = {post}/>
      </View> 
    

      
  
    </View>
  )
}

const PostHeader = ({post}) => (
  <View style={{flexDirection: 'row',
  margin: 5,
  alignItems: 'center',
  }}>
    <View style={{flexDirection: 'row', alignItems:'center'}}>
      <Image source={{uri: post.profile_picture}} style={styles.story}/>
      <Text style={{color:'white', marginLeft: 5, fontWeight: '700'}}>
        {post.user}
      </Text>
    </View>

    <Text style={{color:'white', fontWeight:'900'}}>...</Text>

  </View>
)

const PostImage = ({post}) => (
  <View style={{width:'100%',
    height: 450,
  }}
  >

  <Image 
    source={{uri: post.imageUrl}} 
    style={{height:'100%', resizeMode:'cover'}}
  />
  </View>
)

const PostFooter = ({handleLike, post}) => {
    <View style={{flexDirection:'row'}}>
      <View style={styles.leftFooterIconsContainer}>
        <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl}
        />
        <TouchableOpacity onPress={()=> handleLike(post)}>
          <Image style={styles.footerIcon} source={{uri: post.likes_by_users?.includes(
            firebase.auth().currentUser.email
            ) ? postFooterIcons[0].likedImageUrl : postFooterIcons[0].imageUrl,
            }} /> 
        </TouchableOpacity>

        <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl}
        />

        {/* <Image source={uri={postFooterIcons[2].imageUrl}} style={styles.footerIcon}  /> */}
        <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl}
        />
      </View>

      <View style={{alignItems: 'flex-end'}}>
        <Icon imageStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
      </View>
    </View>
}

const Icon = ({imgStyle, imgUrl}) => (
  <TouchableOpacity>
    <Image source={uri={imgUrl}} style={imgStyle}  />
  </TouchableOpacity>
) 


const Likes = ({post}) => (
  <View style={{flexDirection: 'row', marginTop: 4}}>
    <Text style={{color: 'white', fontWeight: '600'}}>
      {post?.likes_by_users?.length?.toLocaleString('en')} likes</Text>
  </View>
)

const Caption=({post}) => (
  <View style={{marginTop: 5}}>
    <Text style={{color: 'white'}}>
      <Text style={{fontWeight: '600'}}>{post.user}</Text>
      <Text> {post.caption}</Text>
  </Text>
  </View>
)

const CommentSection = ({post}) => (
  <View style={{marginTop: 5}}>
    {!!post?.comments?.length && (
      <Text style={{color: 'gray'}}> 
        View {post?.comments?.length > 1 ? 'all' : ''} {post?.comments?.length}{' '} 
        {post?.comments?.length > 1 ? 'commnets': 'commnet'}
      </Text>
    )}
  </View>
)

const Comments = ({post}) => (
  <>
  {post?.comments?.map((comment, index) => (
    <View key={index} style={{flexDirection: 'row', marginTop: 5}}> 
      <Text style={{color: 'white'}}>
        <Text style={{fontWeight:'600'}}>{comment.user}</Text>{' '}
        {comment.comment}
      </Text>
    </View>
  ))}
  </>
)
const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 5,
    borderWidth: 1.7,
    borderColor: '#2ADFBB',
  },
  footerIcon: {
    width: 32,
    height: 32, 
  },

  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
})

export default Post