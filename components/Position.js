import { View, Text, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import React, { useState, useEffect } from 'react'
import Weather from './Weather'

export default function Position() {

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [message, setMessage] = useState('Haetaan sijaintia...')
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            console.log(status)
            try {
                if (status !== 'granted') {
                    setMessage("Location not permitted.")
                } else {
                    const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setMessage('Sijainti Ok')
                }
            } catch (error) {
                setMessage("Virhe sijainnin saamisessa")
                console.log(error)
            }
            setLoading(false)
        })()
    }, [])


    return (
        <View>
            {isLoading === false &&
                <Weather latitude={latitude} longitude={longitude} />
            }
            <Text style={styles.message}>{message}</Text>
            <Text style={styles.coords}>{latitude.toFixed(3)} , {longitude.toFixed(3)}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    coords: {
        fontSize: 16
    },
    message: {
        fontSize: 20
    }
});
