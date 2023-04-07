import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NoteCard = ({ item }) => (
    <View style={styles.NoteCard}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
    </View>
);

const styles = StyleSheet.create({
    NoteCard: {
        padding: 10,
        margin: 10,
        width: "90%",
        alignItems: "flex-start",
        borderBottomWidth: 2,
        borderBottomColor: "#8c85ff",
        backgroundColor: "#6c63ff",
        borderRadius: 5,
    },
    title: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
    },
    descripcion: {
        color: "white",
        fontSize: 18,
    },
});

export default NoteCard;