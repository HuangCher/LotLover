import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
<<<<<<< Updated upstream

export default function LoginScreen() { 
    const router = useRouter();
=======
import axios from "axios";

export default function LoginScreen() { 
    const router = useRouter();
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 

    const handleLogin = () => {
        axios.post(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:5050/record/login`, { username, password })
        .then((res) => {
            if (res.data.success) {
                router.replace("/(tabs)/map"); 
            } else {
                Alert.alert("Login Failed", "Invalid username or password.");
            }
        })
        .catch((err) => {
            Alert.alert("Error", "Something went wrong. Try again.");
            console.log(err)
        });
    };
>>>>>>> Stashed changes

    return (
        <View >
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
            <TextInput placeholder="Email" style={inputBox} />
            <TextInput placeholder="Password" style={inputBox} secureTextEntry />
            <Button title="Login" onPress={() => router.replace("/(tabs)/map")} />
            <Button title="No Account" onPress={() => router.push("/(auth)/signup")} />
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