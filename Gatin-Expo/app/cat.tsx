import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Cat(){
    const {id, url} = useLocalSearchParams();

    return(
        <View>
            <Image style = {{width: 100, height: 100}} source = {url}/>
            <Text>{id}</Text>
        </View>
    )
}