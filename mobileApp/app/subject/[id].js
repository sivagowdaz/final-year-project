import React, {useState, useEffect} from 'react'
import {Text, View, SafeAreaView, StyleSheet, StatusBar, ActivityIndicator, ScrollView} from 'react-native';
import {Stack, useRouter, useSearchParams} from 'expo-router';
import axios from 'axios';
import jwt from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';


const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: Platform.OS == 'android'?StatusBar.currentHeight:0

    },
    classNumberContainr: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: "#FAFAFC",
        marginBottom: 20,
        borderRadius: 10
    },
    classNumber:{
        fontSize: 25,
        fontWeight: 500,
    },
    percentage: (percentage) => (
        {
            fontSize: 25,
            fontWeight: 600,
            color: percentage > 75? 'green':'red'
        }
    ),
    tableHead: {
        height: 40,
        width: "100%",
        backgroundColor: '#444262',
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableHeadText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 600,
        width: 84,
        paddingHorizontal: 5
    },
    infoRow: {
        height: 40,
        width: "100%",
        backgroundColor: '#C1C0C8',
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoRowText: {
        fontSize: 17,
        width: 84,
        paddingHorizontal: 5
        
    },
    noRecordText: {
        fontSize: 20,
        marginTop: 30,
        color: 'gray',

    }

})

const Subject = () => {
    const params = useSearchParams()
    const [subjectInfo, setSubjectInfo] = useState();
    const router = useRouter();
    useEffect(() => {
        const getToken = async() => {
            let token = await AsyncStorage.getItem('token')
            getSubjectInfo(token)
        }
        getToken()

    }, [])

    const getSubjectInfo = (userToken) => {
        const user = jwt(userToken);
        axios.defaults.headers.get['Authorization'] = userToken
        axios.get(`http://192.168.243.88:5000/api/blockchain/attendance_detail?subject_id=${params.id}&student_id=${user.student_id}`, {
            headers: {
                'authorization': userToken
            }
        })
        .then((response) => {
            console.log(response.data)
            setSubjectInfo(response.data)
        })
        .catch((e) => console.log(e));
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <Stack.Screen
                options={{
                    headerTitle: params?.id || "Subject",
                    headerShadowVisible:false
                }}
            />
            {
                !subjectInfo ? <ActivityIndicator size="large" colors="white"/> : (
                    <View style={{flex:1}}>
                        <View style={styles.classNumberContainr}>
                            <Text style={styles.classNumber}>Total Classes: {subjectInfo.total_classes}</Text>
                            <Text style={styles.classNumber}>Attended Classes: {subjectInfo.attended_classes}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.classNumber}>Percentage: </Text>
                                <Text style={styles.percentage(subjectInfo.percentage)}>{subjectInfo.percentage}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.tableHead}>
                                <Text style={styles.tableHeadText}>No</Text>
                                <Text style={styles.tableHeadText}>Date</Text>
                                <Text style={styles.tableHeadText}>Time</Text>
                                <Text style={styles.tableHeadText}>Remark</Text>
                            </View>
                            {
                                subjectInfo.attendance_record.length == 0 ?
                                    <View style={{alignItems:'center'}}>
                                        <Text style={styles.noRecordText}>No Records Found!!!</Text>
                                    </View>
                                    :
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={{paddingBottom: 10}}
                                    >
                                        {
                                            subjectInfo.attendance_record?.map((item, index) => (
                                                <View style={styles.infoRow} key={index}>
                                                    <Text style={styles.infoRowText}>{item.class_number}</Text>
                                                    <Text style={styles.infoRowText}>{item.date}</Text>
                                                    <Text style={styles.infoRowText}>{item.timestamp}</Text>
                                                    <Text style={styles.infoRowText}>{item.remark}</Text>
                                                </View>
                                            ))
                                        }
                                    </ScrollView>
                            }
                        </View>
                    </View>
                )
            }
        </SafeAreaView>
  )
}

export default Subject