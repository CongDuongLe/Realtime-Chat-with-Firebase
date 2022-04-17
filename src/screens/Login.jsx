import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import {StatusBar} from 'expo-status-bar'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import {auth } from '../../firebase/config'
import { initializeApp } from 'firebase/app';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()


    // handle login
    const handleLogin = () => {
      if (email !== '' && password !== '') {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.replace('Home')
        })
        .catch(error => {
            Alert.alert(error.message)
        })
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
                lineHeight : 50,
                letterSpacing : 1.5,
            }}>Login</Text>
            <Text style={{
                fontSize : 18,
                fontWeight : '400',
                color : '#FFFFFF',
                lineHeight : 25,
                marginTop : '5%',
              
            }}> Please sign in to continue </Text>
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
                    autoFocus={true} 
                    keyboardType="email-address"
                    textContentType="emailAddress"
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
                    textContentType="password"
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
        onPress={() => handleLogin()}
        >
                   <Text style={{
                          fontSize : 18,
                          fontWeight : '700',
                          lineHeight : 25,
                          color : '#000049',
                   }}>SIGN IN</Text> 
        </TouchableOpacity>
        <View style={{
            flexDirection : 'row',
            alignItems : 'center',
            marginTop : '5%',
            alignSelf : 'center',
        }}>
            <Text style={{
                fontSize : 14,
                fontWeight : '500',
                color : '#9FA1AD',
                lineHeight : 20,
                marginRight : '3%',
            }}>Don't have an account ?</Text>
            <TouchableOpacity onPress={() => navigation.replace('Register')}>
                <Text style={{
                    fontSize : 14,
                    fontWeight : '700',
                    color : '#9FA1AD',
                    lineHeight : 20,
                }}>Register</Text>
            </TouchableOpacity>
        </View>
        </View>
    </KeyboardAvoidingView>
  )
}

export default Login