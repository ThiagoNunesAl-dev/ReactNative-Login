import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const salvarToken = async (value) => {
        try {
          await AsyncStorage.setItem('@jwt', value)
        } catch (e) {
          // saving error
        }
      }

    const Logar = () => {
        const corpo = {
            email : email,
            senha : senha
        }

        fetch('http://192.168.0.33:5000/api/Account/login', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(corpo),
        })
        .then(response => response.json())
        .then(data => {
            if(data.status != 404) {
                alert("Login efetuado com sucesso!")
                salvarToken(data.token)
                navigation.push("Autenticado")
            } else {
                alert("Dados Incorretos!")
            }
        })
        .catch((error) => console.log(error))
    }

    return (
        <View style={styles.container}>
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="email@email.com"
            />

            <Text>Senha</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setSenha(text)}
                value={senha}
                secureTextEntry={true}
                placeholder="suasenha12"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={Logar}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

        </View>
    )
}
//height: 40, borderColor: 'gray', borderWidth: 1

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    input : {
        width: '90%',
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 6,
        padding: 10
    },

    button : {
        backgroundColor : 'black',
        padding : 10,
        borderRadius : 6,
        width : '90%',
        marginTop: 10,
        alignItems : 'center',
        justifyContent : 'center'
    },

    buttonText : {
        color : 'white'
    }
  });

export default Login;