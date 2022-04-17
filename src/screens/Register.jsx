import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput} from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import {auth } from '../../firebase/config.js'



const Register = () => {
  const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // handle sign up
    const handleSignUp = () => {
        if (email !== '' && password !== '' && confirmPassword !== '') {
            if (password === confirmPassword) {
                createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    // Alert account creation success
                    Alert.alert('Account created successfully')
                    navigation.replace('Login')
                })
                .catch(error => {
                    Alert.alert(error.message)
                })
            } else {
                Alert.alert('Password does not match')
            }
        } else {
            Alert.alert('Please fill in all fields')
        }
    }



  return (
    <KeyboardAvoidingView style={{
      flex: 1,
      backgroundColor: '#000049',
  }}>
      <StatusBar style="light" backgroundColor='#000049' />
      {/* Top */}
      <View style={{
          flex : 1,
          paddingHorizontal : '5%',
          justifyContent : 'flex-end',
      }}>
          <Text style={{
              fontSize : 34,
              fontWeight : '600',
              color : '#FFFFFF',
              lineHeight : 40,
              letterSpacing : 1.5,
          }}>Dont have an account ?</Text>
          <Text style={{
              fontSize : 18,
              fontWeight : '400',
              color : '#FFFFFF',
              lineHeight : 24,
              marginTop : '3%',
          }}> Please sign up to continue </Text>
      </View>
      {/* Center */}
      <View style={{
          flex : 2,
          alignItems : 'center',
          justifyContent : 'center',
      }}>
          <View style={{
              justifyContent : 'center',
              alignItems : 'center',
              flexDirection : 'row',
              height : 58,
              width : 342,
              backgroundColor : 'rgba(136, 138, 149, 0.42)',
              borderRadius : 13
          }}>
              <Ionicons name="mail" size={24} color="#9FA1AD" />
              <TextInput
                  style={{
                      marginLeft : '5%',
                      width : '80%',
                      height : '100%',
                      fontSize : 16,
                      fontWeight : '400',
                      color : '#9FA1AD',
                  }}
                  placeholder="Email"
                  placeholderTextColor="#9FA1AD"
                  value = {email}
                  onChangeText={(text) => setEmail(text)}    
                  keyboardType="email-address"

              />
          </View>
          {/* password input */}
          <View style={{
              justifyContent : 'center',
              alignItems : 'center',
              flexDirection : 'row',
              height : 58,
              width : 342,
              backgroundColor : 'rgba(136, 138, 149, 0.42)',
              borderRadius : 13, 
              marginTop : '5%',
          }}>
              <FontAwesome5 name="lock" size={22} color="#9FA1AD" />
              <TextInput
                  style={{
                      marginLeft : '5%',
                      width : '80%',
                      height : '100%',
                      fontSize : 16,
                      fontWeight : '400',
                      color : '#9FA1AD',
                  }}
                  placeholder="Password"
                  placeholderTextColor="#9FA1AD"
                  onChangeText={(text) => setPassword(text)} 
                  value = {password}
                  secureTextEntry={true}
                  autoCorrect={false}

              />
          </View>
            {/* confirm password input */}
            <View style={{
              justifyContent : 'center',
              alignItems : 'center',
              flexDirection : 'row',
              height : 58,
              width : 342,
              backgroundColor : 'rgba(136, 138, 149, 0.42)',
              borderRadius : 13, 
              marginTop : '5%',
          }}>
              <FontAwesome5 name="unlock-alt" size={22} color="#9FA1AD" />
              <TextInput
                  style={{
                      marginLeft : '5%',
                      width : '80%',
                      height : '100%',
                      fontSize : 16,
                      fontWeight : '400',
                      color : '#9FA1AD',
                  }}
                      placeholder="Confirmed Password"
                      placeholderTextColor="#9FA1AD"
                      onChangeText={(text) => setConfirmPassword(text)}
                      value={confirmPassword}
                      secureTextEntry={true}
                      autoCorrect={false}
              />
          </View>

      </View>
      {/* Bottom */}
      <View style={{ 
          flex : 1,
          justifyContent : 'center',
          alignItems : 'center',
      }}>
      <TouchableOpacity style={{
          justifyContent : 'center',
          alignItems : 'center',
          width : 324,
          height : 58,
          backgroundColor : 'white',
          borderRadius : 13,
      }}
        onPress={() => handleSignUp()} 
      >
                 <Text style={{
                        fontSize : 18,
                        fontWeight : '700',
                        lineHeight : 25,
                        color : '#000049',
                 }}>REGISTER</Text> 
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Register