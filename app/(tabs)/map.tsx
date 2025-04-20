import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  {
    name: "Flavet Field",
    latitude: 29.6466255,
    longitude: -82.3543578,
    passLevel: "Green",
    hours: "7:30am - 4:30pm",
  },
  {
    name: "Park & Ride Lot #1",
    latitude: 29.637141,
    longitude: -82.368431,
    passLevel: "Park & Ride",
    hours: "7:30am - 4:30pm",
  },
  {
    name: "Hume Hall Lot",
    latitude: 29.6449555,
    longitude: -82.3522077,
    passLevel: "Red 1",
    hours: "7:30am - 4:30pm",
  },
  {
    name: "Simpson Hall Lot",
    latitude: 29.6454476,
    longitude: -82.3502699,
    passLevel: "Red 3",
    hours: "7:30am - 4:30pm",
  },
  {
    name: "Corry Village Lot",
    latitude: 29.646111,    
    longitude: -82.361111, 
    passLevel: "Brown 2",
    hours: "7:30am - 4:30pm",
  },
  {
    name: "Diamond Village Lot",
    latitude: 29.648250,
    longitude: -82.353519,
    passLevel: "Brown 3",
    hours: "7:30am - 4:30pm",
  },
  {
    name: "Turlington Hall Disabled",
    latitude: 29.6489642,
    longitude: -82.3465201,
    passLevel: "Disabled Student",
    hours: "All Day",
  },
  {
    name: "Inner Road – Broward Hall Scooter Parking",
    latitude: 29.6465352,
    longitude: -82.3420708,
    passLevel: "Motorcycle/Scooter",
    hours: "7:30am - 4:30pm",
  },
  {
    name: "Garage 14 – Upper Levels",
    latitude: 29.642205,
    longitude: -82.351255,
    passLevel: "Green",
    hours: "Mon–Fri 7:30am - 4:30pm", // Green permits park on floors 4+ 
  },
  {
    name: "Park & Ride Lot #2 (SW 34th St)",
    latitude: 29.637500,
    longitude: -82.336200,
    passLevel: "Park & Ride",
    hours: "Mon–Fri 7:30am - 4:30pm", // Park & Ride decals valid off‑core lots 
  },
  {
    name: "Sorority Row Lot",
    latitude: 29.645900,
    longitude: -82.349600,
    passLevel: "Red 1",
    hours: "Mon–Fri 7:30am - 4:30pm", // Red 1 lots scattered near Greek housing 
  },
  {
    name: "Fraternity Row Surface Lot",
    latitude: 29.646200,
    longitude: -82.350100,
    passLevel: "Red 3",
    hours: "Mon–Fri 7:30am - 4:30pm", // Red 3 lots serve under‑50‑credit on‑campus 
  },
  {
    name: "Maguire Village Parking Lot",
    latitude: 29.646800,
    longitude: -82.360900,
    passLevel: "Brown 2",
    hours: "Mon–Fri 7:30am - 4:30pm", // Brown 2 zones cover Maguire/Corry/University Village Family Housing 
  },
  {
    name: "University Village South Lot",
    latitude: 29.647200,
    longitude: -82.353800,
    passLevel: "Brown 3",
    hours: "Mon–Fri 7:30am - 4:30pm", // Brown 3 only for Diamond Family Housing 
  },
  {
    name: "Century Tower Disabled Parking",
    latitude: 29.647950,
    longitude: -82.344100,
    passLevel: "Disabled Student",
    hours: "All Day", // Disabled student placards valid in any Blue/Orange/Green/Red/Brown‑restricted lot 
  },
  {
    name: "Broward Hall Scooter Parking Zone",
    latitude: 29.646500,
    longitude: -82.342000,
    passLevel: "Motorcycle/Scooter",
    hours: "Mon–Fri 7:30am - 4:30pm", // Two‑wheel decals park in designated scooter areas 
  },
];

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


// This function will take in the base parking lot list and
// depending on the user's filtering selection, we will produce a 
// new list that will contain all options the user still has selected
// since in the beginning we will have all options selected
// and as the user selects/deselects options, we will filter the list

/**
 * Filters a list of parking lots by the specified pass level.
 *
 * @param parkingLots - Array of ParkingLot objects to filter.
 * @param filter - Pass level to filter by. If empty or whitespace, returns the original list.
 * @returns Array of ParkingLot objects whose passLevel includes the filter.
 */
export interface ParkingLot {
  name: string;
  latitude: number;
  longitude: number;
  passLevel: string;    // e.g. "Gold/Silver" or "Orange/Blue/Green"
  hours: string;
}
// Filters the parkingLots based on the user's pass level.
// The `username` parameter is included for whatever logging/analytics
// you may want to do – it isn't used to filter the lots themselves.
export function filterLotsByPassLevel(

  parkingLots: ParkingLot[],

  selectedPassLevels: string[]

): ParkingLot[] {
    // if nothing selected, show everything
    if (selectedPassLevels.length === 0) {
      return parkingLots;
    }
  
    return parkingLots.filter(lot => {
      // split the lot’s passLevel string into an array
      const lotLevels = lot.passLevel
        .split(/\s*\/\s*/)   // e.g. "Orange/Blue" → ["Orange","Blue"]
        .map(l => l.trim());
  
      // keep this lot if *any* of the user’s selected passes matches
      return selectedPassLevels.some(pass => lotLevels.includes(pass));
    });
}

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [passes, setPasses] = useState<string[]>([]); // will hold the selected pass levels from the dropdown
  const filteredLots = filterLotsByPassLevel(parkingLots, passes); // Compute the filtered list based on the dropdown
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
          
          {/* shows the parking lot locations on the map */
          /*
            We will now use the filtering function to filter the parking lots
            on the map based on the user's selection in the dropdown.
          */
          }

          {filteredLots.map((lot, index) => (
            <Marker
                key={index}
                coordinate={{ latitude: lot.latitude, longitude: lot.longitude }}
                title={lot.name} 
              >
                {/* display the parking lot name and information */}
                <Callout>
                  <View style={{ width: 200 }}>
                    <Text style={{ fontWeight: 'bold' }}>{lot.name}</Text>
                    <Text>Pass Level: {lot.passLevel}</Text>
                    <Text>Hours: {lot.hours}</Text>
                  </View>
                </Callout>
            </Marker>
          ))}
        </MapView>

        <View style={styles.dropdownContainer}>
          <MultiSelect
            style={styles.dropdown}
            data={parkingPasses}
            labelField="label"
            valueField="value"
            placeholder="Select Pass"
            value={passes}
            onChange={item => {
              setPasses(item);
            }}
            placeholderStyle={{ color: 'gray' , fontSize: 15 }}
            selectedTextStyle={{ color: '#000000' , fontSize: 14 }}
            selectedStyle={styles.selectedStyle}
            maxHeight={180}
            inside
            renderSelectedItem={(item) => (
              <View style={styles.selectedItemStyle}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
              </View>
            )}
          />
        </View>
      </View>
      
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 175,    
  },

  map: {
    flex: 1,
  },

  info: {
    position: 'absolute',
    top: 10,
    color: 'white',
  },

  dropdown: {
    borderWidth: 0,
    borderColor: "black",
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    width: 370,
  },

  dropdownContainer: {
    position: 'absolute',
    top: 15,
    left: 10,
  },

  selectedStyle: {
    borderRadius: 12,
  },

  selectedItemStyle: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 5,
    margin: 3,
  },

  selectedTextStyle: {
    fontSize: 14,
  }
});