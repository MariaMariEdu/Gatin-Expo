import axios from "axios";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";


interface Cats {
  id: string, 
  url: string,
  width: number,
  height: number,
}

export default function Index() {
  const [cats, setCats] = useState<Cats[]>([]);
  const [loading, setLoding] = useState(false); 

  
  useEffect (() => {
    getCats();
  }, [])

  useEffect (() => {
    getCats();
  }, [cats])

  const getCats = async () => {
    if (cats.length <10){
      setLoding(true); 
      setCats([ ...cats, (await axios.get ("https://api.thecatapi.com/v1/images/search")).data [0]])
    } else {
      setLoding(false); 
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Gatinhos:</Text>
       {loading ?
       <view>
          <ActivityIndicator size="large" color="#f68ac7ff" />
      </view> 
      
    :
    <>
    <FlatList
    data={cats}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => (
      <Link href={{pathname: './cat', params: {id: item.id, url: item.url}}}>
      <Image style={{width: 100, height: 100}} source = {item.url}/>
      </Link>
       )}

    />

          <TouchableOpacity onPress={() => {setCats([])}} >
       <Text>miau novo</Text>
      </TouchableOpacity>
      </>
    }

    </View>

  );
}
