import { View, Text, Image, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import { Button, Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import {db, firebase} from '../../firebase'

const PLACEHOLDER_IMG = 'https://lh3.googleusercontent.com/ts7clNHn1ZANh0LoJYWyeCN34w94BWBdGSt3iCn1sZqkCivawExiJ8WHdmJDoD9iiFYJ2KoOXbPbMkow8sD9Km5gWhjoFS9XKlOWcDvlDGbn_AzO4klWqiFTQyry9OTRVGcg3Lokb1ZKjLvkh5IaMYBd7r3SjteFNg67tJ7L7Gwe9g71HuMlmyhQQL-HS-8X-a7IXE9DhiL76Al7vyIYvSI2lIvcxPlPnGPqXeKK1HPTpUDzaXbEn7SUxWfKbO4Wm-BPUMsvpSOLv0W1kjRuAztnzCoGvx_IJlCzn19PuMt9bqaA6qGaqA_DX0EY3K_2Pz2nc0jn8s2cKSZ1yv9C1wBUT6eglg-cagtEYyIG3NCWVQpLvnTVv45M2g-eOEi1tqgmxy5LTC06941LTwXd1bhSMAnZUOBR1vk646-3T89oWOBWSS4inGsGtLuDADcNkZZFWmFb-3Ln6DmAvxgXIQzEOCajLPjSDPkWn7xZAafzqrKBXLE0Y-dTnTHtXU3zAvZ-BrlDHyBt10-qoJ4wKNoo3EU5v7MuWNIT76hPC_ULWa-4xwN2szKR1Ww9dvFVUaO3pDqddEFm9tgwwXF9bdFoxu8NHbVrhTxCiYhY-Fsh-n5KL0KpYvu-X9EKKVCP4MmwBqgHwqGWFxdwvG49t1fsc1Nr0N_R-OhHkvs9wr3rvFUZliyAo2-ciyh8nInkJPPMuh05oxZ7K7vaUiT1UibtCZPzIoi5Us-zZspfoaVPxwR9aaBBPuVywKksdp-zzrusdxAtZA_BkjA7awj2FkG5rru08SImnmJ2gUEf2qBxM7CIRNAjnVlnaMgoRP6dqPgs5-u-VfKE1SGBCLwysQ3bNNLu1pDQSm1GbV1NjT7sHiZGE2-1e36bwnj4FVrnxjUl7ZdKM8rFFIpn4V6V8k5lzz9ZLedVLBebs1jGfaHj=w730-h973-no?authuser=0'
const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit')
})



const FormikPostUploader = ({navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUsername = () => {
      const user = firebase.auth().currentUser
      const unsubscribe = db.collection('users').where('owner_uid', '==', user.uid).limit(1).onSnapshot(
        snapshot => snapshot.docs.map(doc => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          })
        })
      )
      return unsubscribe
    }

    useEffect(() => {
      getUsername()
    },[])

    const uploadPostToFirebase = (imageUrl, caption) => {
      const unsubscribe = db.collection('users').doc(firebase.auth().currentUser.email).collection('posts')
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack())

      return unsubscribe
    }
  return (
    <Formik
    initialValues={{caption: '',imageUrl: ''}}
    onSubmit = {(values) => {
      uploadPostToFirebase(values.imageUrl, values.caption)
      }}
    validationSchema = {uploadPostSchema} 
    validateOnMount = {true}
    >
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <>
        <View style={{margin: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
         }}>
          <Image source={{uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl: PLACEHOLDER_IMG}} style={{width: 100, height: 100}}/>
        
         <View style={{flex: 1, marginLeft: 12}}>

          <TextInput 
          style={{color: 'white', fontSize: 20}}
          placeholder = 'Write a caption...'
          placeholderTextColor = 'gray'
          multiline={true}
          onChangeText={handleChange('caption')}
          onBlur={handleBlur('caption')}
          value={values.caption}
          />
          </View>
         </View>
         <Divider width={0.2} orientation='vertical'/>
         <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={{color: 'white', fontSize: 18}}
            placeholder='Enter Image Url'
            placeholderTextColor='gray'
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{fontSize:10, color: 'red'}}>
              {errors.imageUrl}
            </Text>
          )}

          <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
        </>
      )}
      
    </Formik>
  )
}

export default FormikPostUploader