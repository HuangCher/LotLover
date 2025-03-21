import { View, Text, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import axios from "axios";


export default function SignupScreen() {
    const router = useRouter();
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const [pass_level, setPass_level] = useState(""); 
    const [ufid, setUfid] = useState("");  

    const handleSignup = () => {
        if (!username || !password) {
            Alert.alert("Signup failed.", "Username and password are required.");
            return;
        }

        if (!/^\d{8}$/.test(ufid)) { 
            Alert.alert("Signup failed.", "UFID should be exactly 8 digits (numbers only).");
            return;
        }

        axios.post(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:5050/record/`, { username, password, pass_level, ufid })
        .then(() => {
            Alert.alert("Account Created", "You can now login.");
            router.replace("/(auth)/login"); 
        })
        .catch((err) => {
            Alert.alert("Signup failed.", "Try again later.");
            console.log(err)
        });
    };
    return (
        <View>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Sign Up</Text>
            <TextInput placeholder="Username" placeholderTextColor="gray" style={inputBox} onChangeText={setUsername} value={username}/>
            <TextInput placeholder="Password" placeholderTextColor="gray" style={inputBox} secureTextEntry onChangeText={setPassword} value={password} />
            <TextInput placeholder="UFID"placeholderTextColor="gray" style={inputBox} onChangeText={setUfid} value={ufid}/>
            {/* change parking pass to dropdown */}
            <TextInput placeholder="Parsking Pass" placeholderTextColor="gray" style={inputBox} onChangeText={setPass_level} value={pass_level} /> 
            <Button title="Sign Up" onPress={handleSignup} />
            <Button title="Have Account" onPress={() => router.push("/(auth)/login")} />
        </View>
    );
}

const inputBox = {
  borderWidth: 1,
  borderColor: "black",
  padding: 10,
  marginBottom: 10,
  borderRadius: 5,
};
