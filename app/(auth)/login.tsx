import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import axios from "axios";
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() { 
    const router = useRouter();
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");  

    const handleLogin = () => {
        axios.post(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:5050/record/login`, { username, password })
        .then(() => {
            // store the in AsyncStorage
            AsyncStorage.setItem('username', username);
            AsyncStorage.setItem('password', password);
            router.replace("/(tabs)/map"); 
        })
        .catch((err) => {
            Alert.alert("Login Failed", "Invalid username or password.");
            console.log(err)
        });
    };
    return (

        <View style={styles.container}>


            {/* Background design */}
            <View style={styles.wavyLine1} />
            <View style={styles.wavyLine2} />
            <View style={styles.wavyLine3} />

            {/* Logo */}
            <Image
            source={require('../../assets/images/LotLover_Logo.png')}
            style={styles.logoImage}
            />

            {/* Inputs */}
            <TextInput placeholder="Email" placeholderTextColor={'gray'} style={inputBox} onChangeText={setUsername} value={username}/>
            <TextInput placeholder="Password" placeholderTextColor={'gray'} style={inputBox} secureTextEntry onChangeText={setPassword} value={password} />
             
        
            {/* Login Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Spacer */}
            <Text style={styles.spacer}></Text>

            {/* If no account, sign up */}
            <Text style={styles.descriptiveText}>Don't have an account yet?</Text>
            <Button title="Sign Up" onPress={() => router.push("/(auth)/signup")} />
        </View>
    );
}

const inputBox = {
    borderWidth: 0,
    borderColor: "black",
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    width: 300,
  };

// Style Sheet //
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF", // white
        alignItems: 'center',
        paddingTop: 0,
    },
    button: {
        backgroundColor: '#219EBC', // medium blue
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 30,
        alignItems: 'center',
        width: '60%',
    },
    buttonText: {
        color: '#FFFFFF', // white
        fontSize: 18,
        fontWeight: '600',
      },
    descriptiveText: {
        fontSize: 18,
        fontFamily: 'Open Sans',
        color: "#023047", // dark blue
    },
    spacer: {
        flex: 0.45,
    },
    signUpButton: {
        fontSize: 18,
        fontFamily: 'Open Sans'
    },
    logoImage: {
        marginTop: -50,
        width: 150,
        height: 150,
        marginBottom: 0,
      },
      wavyLine1: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 200,  
        backgroundColor: '#FFB703', // light orange
        borderTopLeftRadius: 150,
        borderTopRightRadius: 150,
        transform: [{ scaleX: 1.4}],  
        opacity: 0.6,  
      },
      wavyLine2: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 150,  
        backgroundColor: '#FB8500', // orange
        borderTopLeftRadius: 150,
        borderTopRightRadius: 150,
        transform: [{ scaleX: 1.4}],  
        opacity: 0.6,  
      },
      wavyLine3: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 100,  
        backgroundColor: '#FB8500',  // orange
        borderTopLeftRadius: 150,
        borderTopRightRadius: 150,
        transform: [{ scaleX: 1.1}],  
        opacity: 0.6,  
      },
});