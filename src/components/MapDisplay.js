import { View,StyleSheet } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const MapDisplay = ({data, coordinates}) => {
    const navigation = useNavigation();
   
    const currentCords = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const haifaCords = {
        latitude: 32.7940,
        longitude: 34.9896,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
  return (
      <View style={styles.container}>
          <View style={styles.mapContainer}>
            <MapView
                  style={styles.map}
                  initialRegion={haifaCords}
                  region={currentCords}
                  showsUserLocation
                  onUserLocationChange={() => { }}
              >
                  {data.length > 0 ?
                    data.map((item) => { 
                    return (
                        <Marker
                            key={`key_${coordinates.longitude}_${coordinates.latitude}_${item.id}`}
                            coordinate={{ latitude: coordinates.latitude, longitude: coordinates.longitude, }}
                            onCalloutPress={() => navigation.navigate('NoteScreen', item)}
                            title={item ? item.title : 'Title'}
                        />
                    );
                    })
                      :
                    null}
            </MapView>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center',
        gap:'8%',
    },
    map: {
        width: '100%',
        height: '70%',
    },
    mapContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        width: '100%',
        height: '100%',
    },
});
  
export default MapDisplay