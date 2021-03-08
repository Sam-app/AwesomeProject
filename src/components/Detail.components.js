import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const  Detail = ({detail, title}) =>{
    return (
        <View 
        style={styles.dispay_details}>
            <Text style={styles.title_text}>
                {title}</Text>
            <Text style={styles.detail_text}>
                    { detail }
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    dispay_details:{
        paddingTop: 20,
        backgroundColor:'#fff',
        height: 100,
        paddingLeft:10,
        marginBottom: 10,
        // shadowColor: '#344966',
        // shadowOpacity: 0.1,
        // elevation: 1,
        // borderRadius: 8,
        borderColor:'#d8d0dc',
        borderWidth: 0.2,
    },
    title_text:{
        fontSize:20,
        fontWeight:'bold',
        paddingBottom:8
    },
    detail_text :{
        fontSize: 16
    }
})