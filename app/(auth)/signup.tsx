import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";


export default function SignupScreen() {
    const router = useRouter();

    return (
        <View>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Sign Up</Text>
            <TextInput placeholder="Username" style={inputBox} />
            <TextInput placeholder="Password" style={inputBox} secureTextEntry />
            <Button title="Sign Up" onPress={() => router.replace("/(tabs)/map")} />
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
