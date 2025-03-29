import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Alert, RefreshControl } from "react-native";
import styles from "../Screens/stylesCart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const CartScreen = ({ route, navigation }) => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const mergeCart = (cartItems) => {
    const cartMap = new Map();
    cartItems.forEach((item) => {
      if (cartMap.has(item._id)) {
        cartMap.get(item._id).quantity += item.quantity;
      } else {
        cartMap.set(item._id, { ...item });
      }
    });
    return Array.from(cartMap.values());
  };

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  useEffect(() => {
    if (route.params?.cart) {
      setCart((prevCart) => {
        const mergedCart = mergeCart([...prevCart, ...route.params.cart]);
        AsyncStorage.setItem("cart", JSON.stringify(mergedCart));
        return mergedCart;
      });
    } else {
      loadCart();
    }
  }, [route.params?.cart]);

  useEffect(() => {
    const total = cart
      .filter(item => selectedItems.includes(item._id)) 
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cart, selectedItems]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCart();
    setSelectedItems([]);
    setRefreshing(false);
  };

  const handleRemoveItem = async (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== id);
      AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleQuantityChange = async (id, amount) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      );
      AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCheckout = () => {
    const itemsToCheckout = cart.filter((item) => selectedItems.includes(item._id));
  
    if (itemsToCheckout.length === 0) {
      Alert.alert("Lỗi", "Vui lòng chọn sản phẩm để thanh toán.");
      return;
    }

    navigation.navigate("Payment", { selectedItems: itemsToCheckout, totalPrice });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <TouchableOpacity onPress={() => handleSelectItem(item._id)}>
                  <Ionicons
                    name={selectedItems.includes(item._id) ? "checkbox-outline" : "square-outline"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>

                <Image source={{ uri: item.image }} style={styles.productImage} />

                <View style={styles.textContainer}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>{item.price.toLocaleString()} VNĐ</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => handleQuantityChange(item._id, -1)}>
                      <Ionicons name="remove-circle-outline" size={24} color="red" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleQuantityChange(item._id, 1)}>
                      <Ionicons name="add-circle-outline" size={24} color="green" />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => handleRemoveItem(item._id)}>
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item._id}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />

          {selectedItems.length > 0 && (
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Tổng tiền: {totalPrice.toLocaleString()} VNĐ</Text>
            </View>
          )}

          {selectedItems.length > 0 && (
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Thanh Toán</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default CartScreen;
