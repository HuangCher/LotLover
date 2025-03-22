import { View, Text, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function WelcomeScreen() {
    const router = useRouter();
 
    return (

        <View style={styles.container}>

          {/* Background design */}
            <View style={styles.wavyLine1} />
            <View style={styles.wavyLine2} />
            <View style={styles.wavyLine3} />

          {/* Logo image */}
          <Image
            source={require('../../assets/images/LotLover_Logo.png')}
            style={styles.logoImage}
          />

          {/* Title */}
            <Text style={styles.title}> Welcome</Text>

          {/* Description Text */}
            <Text style={styles.descriptiveText}>Start a better parking experience today.</Text>

          {/* Login Button */}
            <TouchableOpacity style={styles.button} onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

          {/* Sign Up Button  */}
            <TouchableOpacity style={styles.button} onPress={() => router.push("/(auth)/signup")}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

          {/* Car icon at bottom of screen  */}
            <Ionicons name ="car" size = {40} color = "#FFFFFF" style = {styles.icon} />
          
      </View>
    ); 
}; 

// Style Sheet //
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF", // white
        alignItems: 'center',
        paddingTop: 0,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
        color: "#FB8500", // orange
    },
    descriptiveText: {
        fontSize: 18,
        fontFamily: 'Open Sans',
        color: "#FB8500", // orange
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
    icon: {
      position: 'absolute',
      bottom: 20,
      right: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
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
  logoImage: {
    width: 300,
    height: 300,
    marginBottom: -50,
  },
}
);