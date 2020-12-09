import React, { useState } from 'react';
import { Text, StyleSheet, View } from "react-native";

const Header = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}> Tarefas</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#11BA9E",
        height: 48,
    },
    text: {
        fontFamily: "Cochin",
        fontSize: 20,
        color: "white"
    }
});

export default Header;