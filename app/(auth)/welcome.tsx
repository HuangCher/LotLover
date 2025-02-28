import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View>
            <Text>welcome</Text>
            <Button title="Login" onPress={() => router.push("/(auth)/login")} />
            <Button title="Sign Up" onPress={() => router.push("/(auth)/signup")} />
        </View>
    );
};