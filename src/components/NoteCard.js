import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NoteCard = ({ item, cardStyle, titleStyle, descStyle }) => (
    <View style={[styles.NoteCard, cardStyle]}>
        <Text style={[styles.title, titleStyle]}>{item?.title}</Text>
        {item?.descripcion ?
            <Text style={[styles.descripcion, descStyle]}>{item?.descripcion}</Text>
        : null }
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