import { View, Text, TouchableOpacity, Image} from 'react-native'
import React , { useState, useEffect, useLayoutEffect, useCallback} from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {
  collection, addDoc, orderBy, query, onSnapshot
} from 'firebase/firestore'
import {auth, db} from "../../firebase/config.js";
import {useNavigation} from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { Entypo } from '@expo/vector-icons';
import { signOut } from 'firebase/auth'


const Chat = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  //handle sign out events
  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      navigation.replace('Login')
    })
    .catch(error => {
      console.log(error.message)
    })
  }

  // useLayoutEffect for sign out 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleSignOut}
        >
          <Entypo name="log-out" size={30} color="black" />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  // useLayoutEffect for collection, chats is key
  useLayoutEffect(() => {
    const collectionRef = collection(db, 'chats')
    const queryRef = query(collectionRef, orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(queryRef, snapshot => 
      setMessages(snapshot.docs.map(doc => 
        ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        })
        ))
    )
    return () => unsubscribe()
  }, [])
  // onSendMessage
  const onSend = useCallback((messages = []) => {
   //GiftedChat
   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // firebase
    const { _id, text, createdAt, user } = messages[0]
    addDoc(collection(db, 'chats'), { _id, text, createdAt, user })
  }, [])

        





  return (
  //  return to giftchat
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.uid,
        name: auth?.currentUser?.displayName,
        avatar: 'https://i.pravatar.cc/300'
      }}
      isLoading={isLoading}
      isTyping={isTyping}
      messagesContainerStyle={{
        backgroundColor: '#fff',
      }}
      showAvatarForEveryMessage={true}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}


    
    />
  )
}

export default Chat