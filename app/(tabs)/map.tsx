import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";


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

export default function ExploreScreen() {
    return (
        <View>
          <Text>Parking Lot Data Shown</Text>
        </View>
    );
};