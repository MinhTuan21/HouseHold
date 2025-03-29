import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [rating, setRating] = useState(4.5);
  const [reviews, setReviews] = useState(20); 

  const handleAddToCart = async () => {
    try {
      const cart = JSON.parse(await AsyncStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  const handleShare = () => {
    Alert.alert("Chia sẻ", `Bạn đã chia sẻ sản phẩm: ${product.name}`);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.detailImage} />
      <Text style={styles.productTitle}>{product.name}</Text>
      <Text style={styles.productPrice}>Giá: {product.price} VNĐ</Text>
      <Text style={styles.category}>Danh mục: {product.category || "Chưa rõ"}</Text>
      <Text style={styles.stock}>Số lượng còn lại: {product.stock || "Không rõ"}</Text>
      
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={20} color="gold" />
        <Text style={styles.ratingText}>{rating} ({reviews} đánh giá)</Text>
      </View>

      <Text style={styles.description}>{product.description || "Không có mô tả."}</Text>

      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Ionicons name="share-social-outline" size={24} color="white" />
        <Text style={styles.shareText}>Chia sẻ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  detailImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: "#888",
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 5,
  },
  stock: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addToCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  shareButton: {
    flexDirection: "row",
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  shareText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  backButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  backText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
