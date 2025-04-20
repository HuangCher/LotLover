import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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

export default function ProfileScreen() {
  const [pass_level, setPass_level] = useState(""); 
  const router = useRouter();

  // Placeholder vals
  const [username, setUsername] = useState('john_doe');
  const [password, setPassword] = useState('password1');
  const [passLevel, setPassLevel] = useState('Green');
  const [ufid, setUfid] = useState('11111111');
  const [isEditing, setIsEditing] = useState(false);
  
  // For viewing the password
  const [showPassword, setShowPassword] = useState(false);

  const handleDeleteAccount = () => {
    // FILL IN TO UPDATE BACKEND 
  };

  const handleUpdateProfile = () => {
    Alert.alert('Profile Updated', 'Your profile information has been updated!');
    // FILL IN TO UPDATE BACKEND
    setIsEditing(false); 
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
          <TextInput 
            style={styles.infoBox} 
            value={username} 
            editable={isEditing} 
            onChangeText={setUsername} 
          />
        </View>

        {/* Password */}
        <View style={styles.row}>
          <Text style={styles.label}>Password:</Text>
          <View style={styles.infoBox}>
            <TextInput
              style={[styles.passwordContainer, styles.passwordInput]}
              value={password}
              editable={isEditing}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}  // Toggle secureTextEntry based on showPassword
            />
            {/* Button to toggle password */}
            <TouchableOpacity
              style={styles.eyeButton}
              onPressIn={() => setShowPassword(true)}  
              onPressOut={() => setShowPassword(false)} 
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
          {isEditing ? (
            <Dropdown
              data={parkingPasses}
              labelField="label"
              valueField="value"
              placeholder="Pass Type"
              value={pass_level}
              onChange={item => setPass_level(item.value)}
              style={styles.dropdown}
              placeholderStyle={{ color: 'gray', fontSize: 14 }}
              selectedTextStyle={{ color: '#000000', fontSize: 14 }}
              maxHeight={150} 
            />
          ) : (
            <Text style={styles.infoBox}>{passLevel || 'No Parking Pass Selected'}</Text>
          )}
        </View>

        {/* UFID */}
        <View style={styles.row}>
          <Text style={styles.label}>UFID:</Text>
          <TextInput
            style={styles.infoBox}
            value={ufid}
            editable={isEditing}
            onChangeText={setUfid}
          />
        </View>

      </View>

      {/* Buttons for editing */}
      {!isEditing ? (
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity style={styles.saveButton} onPress={handleUpdateProfile}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}

      {!isEditing && (
        <>
        {/* Logout button */}
          <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace("/(auth)/login")}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>

          {/* Delete account button */}
          <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </>
      )}

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
