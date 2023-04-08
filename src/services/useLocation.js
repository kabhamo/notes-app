import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';

export default function useLocation() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            //if (Platform.OS === 'android' && !Device.isDevice) {
            //    setErrorMsg(
            //        'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
            //    );
            //    return;
            //}
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = (await Location.getCurrentPositionAsync({}));
            setLocation(location.coords);
        })();
    }, []);

    let coordinates = 'Waiting..';
    if (errorMsg) {
        coordinates = errorMsg;
    } else if (location) {
        coordinates = (location);
    }
    return [coordinates];
}