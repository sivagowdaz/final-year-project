import React, {useState} from 'react'
import {Text, View, TouchableOpacity, TextInput, StyleSheet, StatusBar, Platform} from 'react-native'
import { Stack, useRouter } from 'expo-router'
import {SafeAreaView} from 'react-native-safe-area-context'
import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: Platform.OS == 'android'?StatusBar.currentHeight:0
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
  },
  loginBox: {
    alignItems:'center'
  },
  title: {
    fontSize: 35,
    fontWeight: 800,
    color: "#312651"
  },
  loginText: {
    marginTop: 100,
    marginBottom: 30,
    fontSize: 35,
    fontWeight: 600,
    color: '#312651',
  },
  searchWrapper: {
    backgroundColor: "#FAFAFC",
    marginRight: 10,
    alignItems: "center",
    borderRadius: 8,
    height: 40,
    width: 280,
    marginBottom: 20
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 15,
  },
  lognBtn: {
    backgroundColor: '#FF7754',
    marginLeft:-10,
    width: 280,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems:"center"
  },
  loginBtnText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  }
})

const Login = () => {
  const router = useRouter();
  const [studentCred, setStudentCred] = useState({
    usn: '',
    password: ''
  })

  const handleLogin = async() => {
    console.log("Student cred", studentCred)
    let response = await axios.post('http://192.168.243.88:5000/api/auth/login_student', studentCred)
    if(response.data?.token.token) {
      try {
        console.log(response.data.token.token)
        await AsyncStorage.setItem('token', response.data.token.token);
        router.push('/');
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Stack.Screen
        options={{
          headerTitle: "Login",
          headerShadowVisible: false,
          headerBackVisible: false,
        }}
      />
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Attendance Manager</Text>
        <View style={styles.loginBox}>
          <Text style={styles.loginText}>Login</Text>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={studentCred.usn}
              onChangeText={(text) => {setStudentCred({...studentCred, usn:text})}}
              placeholder='USN'
            />
          </View>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={studentCred.password}
              onChangeText={(text) => {setStudentCred({...studentCred, password:text})}}
              placeholder='Password'
              
            />
          </View>
          <TouchableOpacity
            style={styles.lognBtn}
            onPress={handleLogin}
          >
            <Text style = {styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login