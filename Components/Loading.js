import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import api from '../Services/api';
import axios from 'axios';

import Lista from './Lista';

class Loading extends Component {

    constructor(props){
        super(props);
    
        this.state = ({
          items: [],
          loading: true,
          itemDescription: '',
          priority: -1
        });
    
      }

    componentDidMount() {
        var newThis = this;
        setInterval(function () {

            axios.get('https://todolist-295919.appspot.com/listItems')
                .then(res => {
                    newThis.setState({
                        items: res.data.items,
                        loading: false
                    });
                })
                .catch(e => {
                    console.log(JSON.stringify(e));
                });

        }, 2000);
    }

    addTodoItem = (itemDescription, priority) => {
        this.setState({
          loading: true
        });
    
        axios.post(`https://todolistserver-291112.appspot.com/addTodoItem?item=${itemDescription}&priority=${priority}`)
        .then(res => {
          this.setState({
            items: res.data.items,
            loading: false
          });
        })
        .catch(e => {
          console.log(JSON.stringify(e));
        });
    
      }

    render() {
        return (
            <View>
                <View style={styles.body}>
                    <Lista list={this.state.items}/>
                </View>
            </View>
        );
    }
}

Loading.propTypes = {

};

const styles = StyleSheet.create({
    body: {
      padding: 10,
      marginBottom: 40
    }
  });

export default Loading;