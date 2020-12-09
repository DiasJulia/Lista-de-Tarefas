import React, { useState } from 'react';
import { CheckBox, Text, StyleSheet, View } from "react-native";

import firestore from '@react-native-firebase/firestore';

const Item = (props) => {
    const item = props.task;

    const [isSelected, setSelection] = useState(item.status);

    var cor = "#FFFFFF"

    if (item.priority == 0) {
        cor = styles.yellow
    } else if (item.priority == 1) {
        cor = styles.orange
    } else {
        cor = styles.red
    }

    async function setStatus(value) {
        setSelection(value)
        console.log(item.key)
        await firestore().collection('toDos').doc(item.key).set({
            item: item.item,
            priority:item.priority,
            status: value
        }).then((res) => {
            this.setState({
                items: res.data.items,
                loading: false
            });
            Alert.alert("Tarefa adicionada");
        }).catch( e=>{
            console.log(e)
        });

    }

    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <View style={[cor, styles.square]}></View>
                <CheckBox
                    value={isSelected}
                    onValueChange={setStatus}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>{item.item}</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderColor: "#c4c4c4",
        margin: 5,
        height: 50,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 5,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    square: {
        margin: 5,
        width: 10,
    },
    red: {
        backgroundColor: "#F0503E"
    },
    orange: {
        backgroundColor: "#F2AD4E"
    },
    yellow: {
        backgroundColor: "#dec41d"
    }

});

export default Item;