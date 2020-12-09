import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Picker, Button, Alert } from 'react-native';

import axios from 'axios';

class AddToDos extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            nome: '',
            priority: 0,
        })
    }

    handleAdd(nome, priority) {
        if (nome == '') {
            Alert.alert("Defina um nome para a tarefa");
        } else {
            var id = Date.now();
            axios.post(`https://todolist-295919.appspot.com/addTodoItem?item=${nome}&priority=${priority}&id=${id}`)
                .then((res) => {
                    this.setState({
                        items: res.data.items,
                        loading: false
                    });
                    Alert.alert("Tarefa adicionada");
                })
                .catch(e => {
                    console.log(JSON.stringify(e));
                });
        }
    }

    render() {
        return (
            <View>
                <View style={styles.card}>
                    <View style={styles.containerAdd}>
                        <View style={styles.input}>
                            <TextInput
                                placeholder='Nomear Tarefa'
                                onChangeText={(text) => this.setState({ nome: text })}
                                value={this.state.nome}
                                style={{ borderBottomColor: "#C4C4C4", borderBottomWidth: 0.5 }}
                            />
                        </View>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={this.state.priority}
                                style={{ height: 50, width: 110 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ priority: itemValue })}
                            >
                                <Picker.Item label="Baixo" value="0" />
                                <Picker.Item label="Médio" value="1" />
                                <Picker.Item label="Alto" value="2" />
                            </Picker>
                        </View>
                    </View>
                    <Button
                        title="Adicionar Tarefa"
                        color="#11BA9E"
                        onPress={() => props.handleAdd(this.state.nome, this.state.priority)}
                    />
                </View>
            </View>
        );
    }
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
})

export default AddToDos;