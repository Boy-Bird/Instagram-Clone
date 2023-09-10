import { View, Text, TextInput, Pressable, TouchableOpacity, StyleSheet} from 'react-native'
import React, {useState} from 'react'
// import { TextInput } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import {firebase, db} from '../../firebase'

const SignupForm = ({navigation}) => {
  const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    username: Yup.string().required().min(2,'A username is required'),
    password: Yup.string()
      .required()
      .min(6, 'Your password has to have at least 6 caracters')
  })

  const getRandomProfilePic = async() => {
    const response = await fetch('https://randomuser.me/api')
    const data = await response.json()
    return data.results[0].picture.large
  }

  const onSignup = async(email, password, username) => {
    try{
      const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
      console.log('Firebase User Created Successfully', email, password)

      db.collection('users').doc(authUser.user.email).set({owner_uid: authUser.user.uid, username: username,
        email: authUser.user.email, 
        profile_picture: await getRandomProfilePic(),
      })
    }catch(error){
      Alert.alert('My Lord...', error.message)
    }
  }
  
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{email:'', username: '', password:''}}
        onSubmit={values=> {
          onSignup(values.email, values.password, values.username)
        }}
        validationSchema={SignupFormSchema}
        validateOnMount={true}
      >
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
          <>
            <View 
              style={[
                styles.inputField,
                {
                  borderColor: 
                    values.email.length<1 || Validator.validate(values.email) ? '#ccc': 'red',
                },
              ]}
            >

              <TextInput
                placeholderTextColor='#444'
                placeholder='Email'
                autoCapitalize='none'
                keyboardType='email-address'
                autoFocus={true}
                onChangeText = {handleChange('email')}
                onBlur={handleBlur('email')}
                value = {values.email}
              />
            </View>

            <View style={[styles.inputField, {borderColor: 1 > values.username.length || values.username.length >= 2 ? '#ccc':'red'}]}>
              <TextInput
                placeholderTextColor='#444'
                placeholder='Username'
                autoCapitalize='none'
                textContentType='username'
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
            </View>
            <View style={[styles.inputField,{borderColor: 1>values.password.length || values.password.length >= 6 ? '#ccc': 'red'}]}>
              <TextInput 
                placeholderTextColor='#444'
                placeholder='Password'
                autoCapitalize='none'
                secureTextEntry={true}
                textContentType='password'
                onChangeText={handleChange('password')}
                onBlue={handleBlur('password')}
                values={values.password}
              />
            </View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
            <View style={styles.loginConatiner}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Text style={{color: '#6BB0F5'}}>Log In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
  },  
  button: isValid=>({
    backgroundColor: isValid ?'#0096F6':'#9ACAF7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
  }),
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
})
export default SignupForm