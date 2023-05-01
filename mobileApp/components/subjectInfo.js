import React from 'react'
import { useRouter } from 'expo-router';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    subjectInfoContainer: {
        marginTop: 30,
        paddingHorizontal: 15,
        paddingVertical: 25,
        paddingTop: 18,
        borderRadius: 10,
        backgroundColor: '#312651'
    },
    subjectTitle: {
        fontSize: 28,
        fontWeight: 500,
        color: 'white'
    },
    teacherName: {
        fontSize: 15,
        color: 'white',
        fontWeight: 300,
    }
})

const SubjectInfo = ({data: {title, teacher_name, subject_id}}) => {
    const router = useRouter();
    return (
            <TouchableOpacity style={styles.subjectInfoContainer} onPress={()=>router.push(`/subject/${subject_id}`)}>
            <Text style={styles.subjectTitle} numberOfLines={1}>{title}</Text>
            <Text style={styles.teacherName}>{teacher_name}</Text>
            </TouchableOpacity>
    )
}

export default SubjectInfo