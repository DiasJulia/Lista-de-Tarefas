import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, Button, Alert } from 'react-native';
import Lista from './Lista';

import firestore from '@react-native-firebase/firestore';

import axios from 'axios';
import AddToDos from './AddToDos';

class ToDoLista extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            items: [],
            loading: true,
            nome: '',
            priority: 0,
        })
    }

    componentDidMount() {
        var this2 = this;
        setInterval(function () {
            const subscriber = firestore()
                .collection('toDos')
                .onSnapshot(querySnapshot => {
                    // see next step
                    const tarefas = [];

                    querySnapshot.forEach(documentSnapshot => {
                        tarefas.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                    });
                    this2.setState({
                        items: tarefas,
                        loading: false,
                    });
                });

        }, 1000);
    }

    async handleAdd(nome, priority) {
        var id = String(Date.now())
        console.log(id)
        if (nome == '') {
            Alert.alert("Defina um nome para a tarefa");
        } else {
            this.setState({
                loading: true,
            })
            await firestore().collection('toDos').doc(id).set({
                item: nome,
                priority: priority,
                status: false
            }).then((res) => {
                this.setState({
                    items: res.data,
                    loading: false
                });
                Alert.alert("Adicionada com sucesso");
            });
        }
    }

    render() {
        if (!this.state.loading) {
            return (
                <View style={styles.body}>

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
                                onPress={() => this.handleAdd(this.state.nome, this.state.priority)}
                            />
                        </View>
                    </View>

                    <Lista list={this.state.items} />
                </View>
            );
        } else {
            return (
                <View style={styles.body}>
                    <Text>Carregando</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    body: {
        padding: 5,
        marginBottom: 40
    },

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

export default ToDoLista;