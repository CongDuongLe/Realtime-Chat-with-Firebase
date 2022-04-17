import { View, Text, TouchableOpacity, Image} from 'react-native'
import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import Bg from '../assets/img/imagebg.png'

const Welcome = ({navigation}) => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#000049',
    }}>
      <StatusBar style="light" backgroundColor='#000049' />
      {/* Top */}
      <View style={{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : '3%'

      }}>
        <Image source={Bg} style={{
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
        }} />
        <Text style={{
          color : '#34BCE5',
          fontSize : 28,
          fontWeight : '700',
          letterSpacing : 1.5,

        }}>
          CHAT APP
        </Text>
      </View>
      {/* center */}
      <View style={{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
      }}>
        <Text style={{
          fontSize : 18,
          fontWeight : '400',
          textAlign : 'center',
          lineHeight : 25,
          paddingHorizontal : '5%',
          color : '#FFFFFF',
        }}>
       Vì mình quá thích cậu rồi phải làm sao phải làm sao? 
        Cậu thấy vậy có được không, phải làm sao phải làm sao?
        </Text>
      </View>
      {/* bottom */}
      <View style={{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        marginBottom : '5%',
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{
            backgroundColor : '#313168',
            borderRadius : 10,
            width : '75%',
            height : '20%',
            justifyContent : 'center',
          }}>
          <Text style={{
            color : '#FFFFFF',
            fontSize : 18,
            fontWeight : '700',
            textAlign : 'center',
          }}>
            REGISTER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            backgroundColor : '#FFFFFF',
            width : '75%',
            borderRadius : 10,
            marginTop : '5%',
            height : '20%',
            justifyContent : 'center',
          }}>
          <Text style={{
            color : '#03063C',
            fontSize : 18,
            fontWeight : '700',
            textAlign : 'center',
          }}>
            SIGN IN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Welcome