// @refresh reset

import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, YellowBox, Button } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '../../firebase/config'

// var firebaseConfig = {

//     apiKey: "AIzaSyAgJQTXN6fDEc7nhpsXXXxvAPl0a-RdOoQ",
//     authDomain: "advisory-board-68f3f.firebaseapp.com",
//     databaseURL: "https://advisory-board-68f3f.firebaseio.com/",
//     projectId: "advisory-board-68f3f",
//     storageBucket: "advisory-board-68f3f.appspot.com",
//     messagingSenderId: "328776166384",
//     appId: "1:328776166384:web:1a7dbe0970be9b4ee38b35"
//     };
      // Initialize Firebase

if (firebase.apps.length === 0) { // 
    firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])



// 123-456 ini dapet dari userID nya si yang login, dan si userID nya si prof / advisor
const Chat = (AdvisorId) => {
    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([]) // nyimpen semua chat yang ditulis
    
    const db = firebase.firestore()
    // akan ngambil data id user yang login dan advisor
    // yang login dari asyncstorage , yang advisor dari AdvisorId
    const chatsRef = db.collection('rooms').doc(`${DoctorId}_${AdvisorId}`).collection('messages')
    
    useEffect(() => {
        getDoctorId()
        readUser()
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => { // jadi nggak nge listen terus terusan , onSnapShot => kepanggil tiap ada update di collection kita
            // console.log(querySnapshot, "<<<<<<<< querysnapshot");
            const messagesFirestore = querySnapshot // nanti isinya ini adalah database yang keganti
                .docChanges() // cuma ngambil data yang baru doang
                .filter(({ type }) => type === 'added') // nambahin data yang baru
                .map(({ doc }) => { // ini isinya data yang baru
                    const message = doc.data() // individual message, method nya bakal ngasih kita data message nya
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // ini yang nampilin urutan chat sesuai urutan bener
            appendMessages(messagesFirestore) // tanpa ini, chatnya bakal ke replace, bukan kenambahin chat bar nya
        })
        return () => unsubscribe()
    }, [])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function readUser() {
        const user = await AsyncStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }
    async function handlePress() {
        const _id = Math.random().toString(36).substring(7)
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }
    async function handleSend(messages) {
        const writes = messages.map((m) => chatsRef.add(m)) // nambahin chat yang baru ke dalam database
        await Promise.all(writes)
    }

    let DoctorId
    const getDoctorId = async () => {
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
            // We have data!!
            DoctorId = value
            console.log(value), "<<<<<<<doctor ID";
            }
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    }

    if (!user) {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
                <Button onPress={handlePress} title="Enter the chat" />
            </View>
        )
    }
    return <GiftedChat messages={messages} user={user} onSend={handleSend} />
}

export default Chat;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})
