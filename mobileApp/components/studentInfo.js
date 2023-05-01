import React from 'react'
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    studentInfoContainer: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: "#FAFAFC",
        padding: 15,
        borderRadius: 10

    },
    nameStyle: {
        fontSize: 30,
        fontWeight: 600,
    },
    usnStyle: {
        fontSize: 25,
        fontWeight: 500
    }
})



const StudentInfo = ({data:{name, email, usn}}) => {
  return (
    <View style={styles.studentInfoContainer}>
        <Text style={styles.nameStyle}>{name}</Text>
        <Text style={styles.usnStyle}>{usn}</Text>
        <Text>{email}</Text>
    </View>
  )
}

export default StudentInfo