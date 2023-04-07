import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ styleButton, styleText, title, onPress }) => (
    <TouchableOpacity
        style={[styles.button, styleButton]}
        onPress={onPress}
        activeOpacity={0.5}>
        <Text style={[styles.text, styleText]}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 23,
        fontWeight:'600',
        textAlign: "center",
    },
    button: {
        color: "white",
        backgroundColor: "#6c63ff",
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
});

export default Button