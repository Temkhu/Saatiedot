import { View, Text, Image } from 'react-native'
import React, {useState, useEffect, StyleSheet} from 'react'


const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICONS_URL
};

export default function Weather(props) {
    const [temp, setTemp] = useState(0)
    const [desc, setDesc] = useState('')
    const [icon, setIcon] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        const url = api.url + 
        'lat=' + props.latitude +
        '&lon=' + props.longitude +
        '&units=metric' + 
        '&appid=' + api.key
        
        fetch(url)
        .then(res => res.json())
        .then((json) => {
            console.log(json)
            setTemp(json.main.temp)
            setDesc(json.weather[0].desc)
            setIcon(api.icons + json.weather[0].icon + '@2x.png')
            setName(json.name)
        })
        .catch((error) => {
            setDesc("Virhe ladattaessa säätietoja")
            console.log(error)
        })
        }, [])

  return (
    <View>
              {icon &&
      <Image source={{uri: icon}} style={{width:100, height: 100}} />
      }
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.temp}>{temp}</Text>
      <Text>{desc}</Text>
    </View>
  )
}


const styles = {
    temp: {
       fontSize: 32
    },
    name: {
        fontSize: 20
    }
  };
  