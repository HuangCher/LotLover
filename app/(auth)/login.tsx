import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";

export default function LoginScreen() { 
    const router = useRouter();

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