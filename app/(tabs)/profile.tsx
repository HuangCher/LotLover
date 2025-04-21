import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [pass_level, setPass_level] = useState(""); 
  const router = useRouter();

  const [currentUsername, setCurrentUsername] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passLevel, setPassLevel] = useState('');
  const [ufid, setUfid] = useState('');
  // for viewing the password
  const [showPassword, setShowPassword] = useState(false);

  // load user data
  useEffect(() => {
    const loadUserData = async () => {
      // get the username from AsyncStorage
      try {
        const storedUsername = await AsyncStorage.getItem('username');

        if (storedUsername) {
          // fetch user data from backend
          const response = await axios.get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:5050/record/${storedUsername}`);
          const userData = response.data as { username: string; password: string; pass_level: string; ufid: string };

          // sets the state variables with the fetched data
          setCurrentUsername(userData.username);
          setUsername(userData.username);
          setPassword(userData.password);
          setPassLevel(userData.pass_level);
          setUfid(userData.ufid);

        }
      } catch (error) {
        console.error('Error loading user data', error);
      }
    };
    
    loadUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('username');
    router.replace("/(auth)/login");
  };

  const handleDeleteAccount = async () => {
    // Confirmation dialog before deletion
    Alert.alert("Delete Account", "Are you sure you want to delete your account?", [
      { text: "Cancel", style: "cancel"},
        { text: "Delete", onPress: async () => {
            try {
              await axios.delete(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:5050/record/${username}`);
              await AsyncStorage.removeItem('username');
              Alert.alert("Account Deleted", "Your account has been deleted.");
              router.replace("/(auth)/login");
            } catch (err) {
              Alert.alert("Acount Deletion Failed", "Try again later.");
              console.log(err);
            }
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../assets/images/LotLover_Logo.png')}
        style={styles.logo}
      />

      {/* Profile Box */}
      <View style={styles.profileBox}>
        {/* Username */}
        <View style={styles.row}>
          <Text style={styles.label}>Username:</Text>
          <View style={styles.infoBox}>
            <Text>{username}</Text>
          </View>
        </View>

        {/* Password - shown by default */}
        <View style={styles.row}>
          <Text style={styles.label}>Password:</Text>
          <View style={styles.infoBox}>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={!showPassword} // toggle secureTextEntry based on showPassword
            value={password}
            editable={false}
          />
            {/* Button to toggle password */}
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(prev => !prev)} 
            >
              <FontAwesome 
                name={showPassword ? 'eye-slash' : 'eye'} 
                size={20} 
                color="#023047" 
              />
            </TouchableOpacity>          
          </View>
        </View>

        {/* Pass Level */}
        <View style={styles.row}>
          <Text style={styles.label}>Pass Level:</Text>
          <View style={styles.infoBox}>
            <Text>{passLevel || 'No Parking Pass Selected'}</Text>
          </View>
        </View>

        {/* UFID */}
        <View style={styles.row}>
          <Text style={styles.label}>UFID:</Text>
          <View style={styles.infoBox}>
            <Text>{ufid}</Text>
          </View>
        </View>
      </View>

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

      {/* Delete account button */}
      <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    marginTop: -50,
    width: 150,
    height: 150,
    marginBottom: 0,
  },
  profileBox: {
    width: '100%',
    padding: 20,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#023047',
    fontWeight: '600',
  },
  infoBox: {
    flex: 2,
    padding: 10,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  dropdown: {
    flex: 2,
    padding: 10,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flex: 2,
    padding: 10,
    borderColor: '#bbb',
    borderRadius: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
  editButton: {
    backgroundColor: '#FB8500',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#023047',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#219EBC',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  deleteAccountButton: {
    backgroundColor: '#FF4D4D',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  deleteAccountButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

});
