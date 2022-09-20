import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert,
  Image
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";





function MapScreen() {
  const [initialLat, setInitialLat] = useState(37.0902);
  const [initialLon, setInitialLon] = useState(-95.7129);
  const [initialLatDelta, setInitialLatDelta] = useState(30);
  const [initialLonDelta, setInitialLonDelta] = useState(60.0099);
  const [followUserLocationBoolean, setFollowUserLocationBoolean] = useState(true);
  const [coordinates, setCoordinates] = useState([]);
  const [running, setRunning] = useState(false);
  const [imageKeys, setImageKeys] = useState(0);
  const [data, setData] = useState(
    [
      {
        longitude: -74.5747,
        latitude: 40.8478,
        id: null,
      }
    ]
  )

  useEffect(() => {
    let temp = data;
    temp.id = imageKeys;
    setImageKeys(imageKeys + 1);
    setData(temp);
  }, [])

  function setLocation(e) {
    if (running) {
      setLatitude(e.nativeEvent.coordinate.latitude);
      setLongitude(e.nativeEvent.coordinate.longitude);
      var c = e.nativeEvent.coordinate;
      var temp = [];
      for (let i = 0; i < coordinates.length; i++) {
        temp.push(coordinates[i]);
      }
      temp.push({
        latitude: c.latitude,
        longitude: c.longitude,
      });
      setCoordinates(temp);
      console.log(temp)
    }
  }
  
  function changeMapView(region) {
    setInitialLat(region.latitude);
    setInitialLon(region.longitude);
    setInitialLatDelta(region.latitudeDelta);
    setInitialLonDelta(region.longitudeDelta);
  }

  return(
     <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType="hybrid"
          showsUserLocation
          //followsUserLocation={followUserLocationBoolean}
          showsPointsOfInterest
          showsCompass
          onRegionChange={(region) => changeMapView(region)}
          onUserLocationChange={(e) => setLocation(e)}
          initialRegion={{
            latitude: initialLat,
            longitude: initialLon,
            latitudeDelta: initialLatDelta,
            longitudeDelta: initialLonDelta,
          }}
        >
          <Marker coordinate={{latitude: 40.72886598967254, longitude: -73.99054946724266}}>
            <View 
              style={{height: 50, width: 50, backgroundColor: 'black', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}
            >
              <Image source={require("./Images/OkIPullUp.jpeg")} style={{height: 45, width: 45, alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}/>
            </View>
          </Marker>
        </MapView>
      </View>
  )
}

function ReportScreen() {
  return(
    <View style={styles.container}>
      <Text>Test2</Text>
    </View>
  )
}

function HistoryScreen() {
  return(
    <View style={styles.container}>
      <Text>Test3</Text>
    </View>
  )
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" options={{ 
          headerShown: false,
          tabBarLabel: "Map",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="map" size={size} color={color} />
          ),
        }} component={MapScreen} />
      <Tab.Screen name="report" options={{ 
        headerShown: false,
        tabBarLabel: "Report",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="report" size={size} color={color} />
          ),
         }} component={ReportScreen} />
      <Tab.Screen name="history" options={{ 
        headerShown: false,
        tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calendar" size={size} color={color} />
          ), }} component={HistoryScreen} />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
