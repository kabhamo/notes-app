import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = ({title}) => {
  return (
    <View>
        <Text style={styles.title}>{title}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    title: {
        marginTop: 0,
        paddingVertical: '5%',
        borderWidth: 2,
        borderColor: '#B2A4FF',
        width:'100%',
        backgroundColor: '#6c63ff',
        color: '#fff',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
})
export default Header