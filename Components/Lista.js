import React, { Component, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Picker, Button, ScrollView, Alert } from 'react-native';
import Item from './Item';

import axios from 'axios';

const Lista = (props) => {

    const [todos, setTodos] = useState(
        props.list
    );

    return (
        <View>
            

            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <View>
                        <Item task={item} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 0.5,
        borderColor: "#c4c4c4",
        backgroundColor: "white",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5,

        elevation: 7,
        padding: 10,
        borderRadius: 5,
    },

    hairline: {
        flex: 1,
        backgroundColor: '#A2A2A2',
        height: 1,
    },

    containerAdd: {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10
    },
    picker: {
        fontSize: 10,
        borderColor: "#11BA9E",
        borderWidth: 1,
        borderRadius: 5
    },
    input: {
        width: 150
    }
});

export default Lista;