import { TextInput, StyleSheet } from 'react-native'
import React from 'react'

const Input = ({ secure, type, styleInput, ...rest }) => (
    <TextInput
        {...rest}
        style={[styles.input, styleInput]}
        autoCapitalize="none"
        secureTextEntry={secure}
        textContentType={type}
        placeholderTextColor="#746dff"
    />
);

const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        color: "#6c63ff",
        margin: 8,
        width: "88%",
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#6c63ff",
        paddingVertical: 15,
        paddingLeft: 20,
        backgroundColor: "white",
    },
});

export default Input