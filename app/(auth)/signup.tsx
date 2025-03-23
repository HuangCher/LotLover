import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import { StyleSheet } from 'react-native';
import axios from "axios";
import { Dropdown } from 'react-native-element-dropdown';


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


    const parkingPasses = [
        { label: 'Green', value: 'Green' },
        { label: 'Park & Ride', value: 'Park & Ride' },
        { label: 'Red 1', value: 'Red 1' },
        { label: 'Red 3', value: 'Red 3' },
        { label: 'Brown 2', value: 'Brown 2' },
        { label: 'Brown 3', value: 'Brown 3' },
        { label: 'Disabled Student', value: 'Disabled Student' },
        { label: 'Motorcycle/Scooter', value: 'Motorcycle/Scooter' },
    ];


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

            {/* Input Boxes */}
            <TextInput placeholder="Username" placeholderTextColor={'#d0d0d0'} style={inputBox} />
            <TextInput placeholder="Password" placeholderTextColor={'#d0d0d0'} style={inputBox} secureTextEntry />
            <TextInput placeholder="UFID" placeholderTextColor={'#d0d0d0'} style={inputBox} onChangeText={setUfid} value={ufid}/>


            {/* Dropdown menu */}
            <Dropdown
            data={parkingPasses}
            labelField="label"
            valueField="value"
            placeholder="Select Parking Pass"
            value={pass_level}
            onChange={item => setPass_level(item.value)}
            style={inputBox}
            containerStyle={{ marginTop: 10 }}
            placeholderStyle={{ color: '#d0d0d0' }}
            selectedTextStyle={{ color: '#000000' }}
            maxHeight={150} 
            />

        
            {/* Sign Up Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignup}> 
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Spacer */}
            <Text style={styles.spacer}></Text>

            {/* If already have an account, login */}
            <Text style={styles.descriptiveText}>Already have an account?</Text>
            <Button title="Login" onPress={() => router.push("/(auth)/login")} />

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
        backgroundColor: '#FB8500', // orange
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
        color: "#FB8500", // orange
    },
    spacer: {
        flex: 0.2,
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
        backgroundColor: '#8ECAE6', // light blue
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
        backgroundColor: '#219EBC', // medium blue
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
        backgroundColor: '#023047',  // dark blue 
        borderTopLeftRadius: 150,
        borderTopRightRadius: 150,
        transform: [{ scaleX: 1.1}],  
        opacity: 0.6,  
      },
});