import React from "react";
import { StyleSheet, View, Text, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import img from '../assets/img/imagebg.png'
import { signInWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'
import {auth } from '../../firebase/config'



const Bottom = () => {
    const navigation = useNavigation()
    //handle sign out
    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            Alert.alert('Signed out successfully')
            navigation.replace('Login')
        })
        .catch(error => {
            Alert.alert(error.message)
        })
    }

    return (
        <View style={style.container}>
            <Text style={style.title}>App Store 🔥</Text>
            <View style={style.appInfo}>
                <Image style={style.image} source={img} />
                <View style={{ marginLeft: 15}}>
                    <Text style={style.text}>Rockets X</Text>
                    <Text style={[style.text, {color: 'gray'}]}>Duongle2403</Text>
                    <Text style={[style.text, {color: 'gray'}]}>Click button to log out</Text>
                </View>
            </View>
            <View style={style.separator}></View>
            <Text style={[style.text, {color: 'gray', marginLeft: 15, marginVertical: 5}]}>ACCOUNT<Text style={[style.text]}> Duongle240300@gmail.com</Text></Text> 
            <View style={style.separator}></View>
            <TouchableOpacity
                onPress={handleSignOut}
            >
                <View style={style.confirmButton}>
                    <Text style={{ color: '#fff', fontSize: 30 }}>💸</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    )
}

export default  Bottom;

const style = StyleSheet.create({
    container: {
        marginHorizontal: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 30,
        letterSpacing: .5,
        color: "#000",
    },
    text: {
        color: "#000",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    appInfo: {
        flexDirection: "row",
        marginLeft: '10%',
        alignItems: "center",
        marginBottom: 20,
    },
    separator: {
        height: 1,
        backgroundColor: "#00000040",
        marginVertical: 10,
    },
    confirmButton: {
        backgroundColor: "#0080FB",
        height: 50,
        width: 50,
        borderRadius: 30,
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 15,
        alignItems: "center",
    }
});