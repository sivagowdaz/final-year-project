import React, {useState, useEffect} from 'react'
import {Text, View, SafeAreaView, Platform, StatusBar, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import {Stack, useRouter} from 'expo-router';
import StudentInfo from '../components/studentInfo';
import SubjectInfo from '../components/subjectInfo';
import axios from 'axios';
import jwt from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: Platform.OS == 'android'?StatusBar.currentHeight:0

    },
    logout: {
        fontSize: 18,
        fontWeight: 600,
        color: 'white'
    },
    logoutBtn: {
        padding: 5,
        backgroundColor: "#FF7754",
        borderRadius: 5,
    }

})


const Index = () => {
    let subArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const router = useRouter()
    const [token, setToken] = useState(null);
    const [subjectData, setSubjectData] = useState(null)

    const handlePress = async () => {
        await AsyncStorage.removeItem('token')
        router.push("/login")
    }

    useEffect(() => {
        const getToken = async() => {
            let token = await AsyncStorage.getItem('token')
            setToken(token)
            getSubjects(token)
        }
        getToken()
    }, [])


    const getSubjects = (userToken) => {
        console.log("inside get subjects");
        const user = jwt(userToken);
        axios.defaults.headers.get['Authorization'] = userToken
        axios.get(`http://192.168.243.88:5000/api/crud/get_subjects/${user.classroom_id}`, {
            headers: {
                'authorization': userToken
            }
        })
        .then((response) => {
            if(response.data.status == 200) {
                setSubjectData(response.data.data)
            } else {
                router.push('/login')
            }
        })
        .catch((e) => console.log(e));
    }
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <Stack.Screen
                options={{
                    headerTitle: "Home",
                    headerShadowVisible: false,
                    headerRight: () => (
                        <TouchableOpacity
                            style={styles.logoutBtn}
                            onPress={async()=>await handlePress()}
                        >
                            <Text style={styles.logout}>Logout</Text>
                        </TouchableOpacity>
                    )

                }}
            />
            <View>
                <StudentInfo
                    data={{name:"shivaprasad", email:"shiva@gmail.com", usn:"4so19cs145"}}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 100}}
                >
                    {
                        !subjectData ? (<ActivityIndicator size="large" colors="white" />)
                            : subjectData.length == 0 ? (<Text>No Subjects</Text>)
                                : (
                                    subjectData?.map((item, index) => <SubjectInfo key={index} data={{title: item.name, teacher_name:item.teacher_name, subject_id:item.subject_id}} />)
                                )
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
  )
}

export default Index
