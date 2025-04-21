import { Linking, Platform, View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

// parkingLots is our list that contains all the parking lots 
// and their information
// including name, latitude, longitude, passLevel, and hours available
const parkingLots = [
  {
    name: "Little Hall Lot",
    latitude: 29.649798,
    longitude: -82.34019,
    passLevel: "Gold/Silver",
    hours: "7:30am - 5:30pm",
  },
  {
    name: "Criser Hall Lot",
    latitude: 29.649796,
    longitude: -82.342975,
    passLevel: "Gold/Silver", 
    hours: "7:30am - 5:30pm",
  },
  {
    name: "Feltcher Dr",
    latitude: 29.650695,
    longitude: -82.346277,
    passLevel: "Gold/Silver",
    hours: "7:30am - 5:30pm",
  },
  {
    name: "Black Hall",
    latitude: 29.641701,
    longitude: -82.347866,
    passLevel: "Orange",
    hours: "7:30am - 4:30pm",
  },
  {
    name: "Engineering Design",
    latitude: 29.642043,
    longitude: -82.348433,
    passLevel: "Orange",
    hours: "7:30am - 4:30pm",
  },
  {
    name: "Fine Arts C",
    latitude: 29.647572,
    longitude: -82.341393,
    passLevel: "Gold/Silver",
    hours: "7:30am - 5:30pm",
  },
  {
    name: "Garage 13",
    latitude: 29.640555,
    longitude: -82.349665,
    passLevel: "Orange/Blue/Gold/Silver",
    hours: "All Day",
  },
  {
    name: "Gale Lemerand Surfact Lot",
    latitude: 29.641507,
    longitude: -82.351268,
    passLevel: "Red",
    hours: "7:30am - 3:30pm",
  },
  {
    name: "Yulee Hall/Reid Hall",
    latitude: 29.644769,
    longitude: -82.344068,
    passLevel: "Orange",
    hours: "7:30am - 4:30pm",
  },
  {
    name: "Garage 14",
    latitude: 29.642205,
    longitude: -82.351255,
    passLevel: "Orange/Blue/Green",
    hours: "7:30am - 3:30pm",
  },
  {
    name: "Murphree",
    latitude: 29.6511956,
    longitude: -82.3465713,
    passLevel: "Gold/Silver",
    hours: "All Day",
  },
  {
    name: "O'Connel Center NW",
    latitude: 29.651167,
    longitude: -82.350893,
    passLevel: "Orange",
    hours: "7:30am - 3:30pm",
  },
  {
    name: "Rhines Hall",
    latitude: 29.647438,
    longitude: -82.348742,
    passLevel: "Orange",
    hours: "7:30am - 4:30pm",
  },
  {
    name: "East Hall",
    latitude: 29.646874,
    longitude: -82.35008,
    passLevel: "Orange",
    hours: "7:30am - 3:30pm",
  },
  {
    name: "Garage 5",
    latitude: 29.643297,
    longitude: -82.350475,
    passLevel: "Red/Visitor",
    hours: "All Day",
  },
  {
    name: "West O'Connell",
    latitude: 29.648756,
    longitude: -82.352228,
    passLevel: "Green",
    hours: "7:30am - 3:30pm",
  },
  {
    name: "Hume Hall",
    latitude: 29.644215,
    longitude: -82.351002,
    passLevel: "Red 1",
    hours: "7:30am - 3:30pm",
  },
  {
    name: "Garage 12",
    latitude: 29.645407,
    longitude: -82.348043,
    passLevel: "Gold/Silver/Visitor",
    hours: "All Day",
  },
  {
    name: "Frazier Rogers Hall",
    latitude: 29.644571,
    longitude: -82.346472,
    passLevel: "Orange",
    hours: "7:30am - 4:30pm",
  },
  {
    name: "Keys Complex-1",
    latitude: 29.648053,
    longitude: -82.354002,
    passLevel: "Red 1",
    hours: "7:30am - 3:30pm",
  },
  {
    name: "Garage 4",
    latitude: 29.645222,
    longitude: -82.343489,
    passLevel: "Orange",
    hours: "All Day",
  },
  {
    name: "Keys Complex-2",
    latitude: 29.648055,
    longitude: -82.354965,
    passLevel: "Red 1",
    hours: "7:30am - 3:30pm",
  },
  {
    name: "Graham",
    latitude: 29.645366,
    longitude: -82.352527,
    passLevel: "Red",
    hours: "7:30am - 3:30pm",
  },
  {
    name: "McCarty Hall",
    latitude: 29.645955,
    longitude: -82.34408,
    passLevel: "Orange",
    hours: "7:30am - 4:30pm",
  },
  {
    name: "Infirmary",
    latitude: 29.648837,
    longitude: -82.346346,
    passLevel: "Gold/Silver",
    hours: "7:30am - 5:30pm",
  },
  {
    name: "Norman Field",
    latitude: 29.645444,
    longitude: -82.33808,
    passLevel: "Orange/Green",
    hours: "7:30am - 4:30pm",
  },
  {
    name: "Geer Hall",
    latitude: 29.64881,
    longitude: -82.359792,
    passLevel: "Orange",
    hours: "7:30am - 3:30pm",
  },
  {
    name: "Law School - GR",
    latitude: 29.649542,
    longitude: -82.358118,
    passLevel: "Green",
    hours: "7:30am - 3:30pm",
  },
  {
    name: "Flavet",
    latitude: 29.646036,
    longitude: -82.35299,
    passLevel: "Green",
    hours: "7:30am - 3:30pm",
  },
  {
    name: "Cory Village",
    latitude: 29.646735,
    longitude: -82.362474,
    passLevel: "Brown",
    hours: "All Day",
  },
];

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // request location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert('Location permission not granted');
        return;
      }

      // gets the current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  // check if location is null or undefined and show a loading indicator
  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const { latitude, longitude } = location.coords;

  const handleGetDirections = async (lat: number, lon: number) => {
    const destination = `${lat},${lon}`;
    // create the app URLs
    const appleMapsURL  = `maps://?daddr=${destination}`; // ios
    const googleMapsURL = `google.navigation:q=${destination}`; // android 

    // picks the native URL
    let url = Platform.OS === 'ios' ? appleMapsURL : googleMapsURL;
  
    Linking.openURL(url).catch(err => {
      Alert.alert('Error', 'Unable to open maps app.');
    });
  };

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }}
          showsUserLocation={true}>
          
          {/* shows the parking lot locations on the map */}
          {parkingLots.map((lot, index) => (
            <Marker
                key={index}
                coordinate={{ latitude: lot.latitude, longitude: lot.longitude }}
                title={lot.name} 
                onCalloutPress={() => handleGetDirections(lot.latitude, lot.longitude)}
              >
                {/* display the parking lot name and information */}
                <Callout>
                  <View style={{ width: 200 }}>
                    <Text style={{ fontWeight: 'bold' }}>{lot.name}</Text>
                    <Text>Pass Level: {lot.passLevel}</Text>
                    <Text>Hours: {lot.hours}</Text>
                    <Text style={styles.directions}>
                      Directions
                    </Text>
                  </View>
                </Callout>
            </Marker>
          ))}
        </MapView>

        {/* add a dropdowmn here with filtering */}
          <Text style={styles.info}> PUT DROPDOWN HERE WITH FILTERING </Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 50,    
  },

  map: {
    flex: 1,
  },

  info: {
    position: 'absolute',
    top: 10,
    color: 'white',
  },

  directions: {
    marginTop: 8,
    color: '#FB8500',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});