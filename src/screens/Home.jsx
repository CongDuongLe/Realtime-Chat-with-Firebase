import React, { useCallback, useRef, useState, useMemo} from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {StatusBar} from 'expo-status-bar'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const Profile = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";
import Bottom from '../components/Bottom';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { signInWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'
import {auth } from '../../firebase/config'

const Home = () => {
    const navigation = useNavigation();
    const [isOpen, setIsOpen] = useState(false);
    // ref
    const sheetRef = useRef<BottomSheet>(null);
    // variables
    const snapPoints = useMemo(() => ['40%', '60%'], []);
    // callbacks
    const handleSnapPress = useCallback((id) => {
        if (sheetRef.current) {
            sheetRef.current.snapTo(id);
        }
    setIsOpen(!isOpen);
    }, []);

    //handle Sign Out
    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            navigation.replace('Login')
        })
        .catch(error => {
            console.log(error.message)
        })
    }


    // header with user image, search input and messenger icons
    const Header = () => {
        return (
            <View style={styles.header}>
              {/* left */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  // Logout
                    onPress={handleSignOut}
                >
                  <Image 
                      source={{ uri: Profile }}
                  style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                  }} />
                </TouchableOpacity>
                {/* center */}
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFFFFF', letterSpacing: 1.2}}>
                  Home
                </Text>
                  {/* right */}
                    <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                        <FontAwesome5 name="facebook-messenger" size={28 } color="#fff" />
                    </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor='#1C6DD0' />
            <Header />
            {/* Float button */}
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={24} color='white' />
            </TouchableOpacity>
            {/* Bottom sheet */}
            {/* <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                enabledBottomClamp={true}
                onClose={()=> setIsOpen(!isOpen)}  
            >
                <BottomSheetView>
                  <Text>Hello</Text>
                  <Bottom/>
                </BottomSheetView>
            </BottomSheet> */}
           
        </View>
    );
    };

    export default Home;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
        },
        chatButton: {
            backgroundColor: '#1C6DD0',
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
            position: 'absolute',
            bottom: 30,
            right: 20,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: '#1C6DD0',
            borderBottomWidth: 1,
            borderBottomColor: '#e0e0e0',
            elevation: 5,
        },

    });