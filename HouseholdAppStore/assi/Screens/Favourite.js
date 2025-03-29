import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Screens/stylesFavourite";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavouriteScreen = ({ route, navigation }) => {
  const [favourites, setFavourites] = useState(route.params?.favourites || []);

  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const storedFavourites = await AsyncStorage.getItem("favourites");
        if (storedFavourites) {
          setFavourites(JSON.parse(storedFavourites));
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách yêu thích:", error);
      }
    };

    loadFavourites();
  }, [route.params?.favourites]);

  const removeFromFavourites = async (itemId) => {
    const updatedFavourites = favourites.filter((item) => item._id !== itemId);
    setFavourites(updatedFavourites);
  
    try {
      await AsyncStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    } catch (error) {
      console.error("Lỗi khi lưu danh sách yêu thích:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite</Text>

      {favourites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite products found.</Text>
      ) : (
        <FlatList
          data={favourites}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>

              <TouchableOpacity 
                onPress={() => removeFromFavourites(item._id)}
              >
                <Ionicons name="trash" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

export default FavouriteScreen;
