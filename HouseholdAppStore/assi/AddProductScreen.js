import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import styles from "./stylesAddProduct";

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");

  const categories = ["Nike", "Jordan", "LA", "AS"];
  const ratings = ["1", "2", "3", "4", "5"];
  const descriptions = [
    "Sản phẩm chất lượng cao, bền đẹp.",
    "Hàng chính hãng, bảo hành 12 tháng.",
    "Mẫu mã sang trọng, phù hợp mọi không gian.",
    "Giá cả hợp lý, giao hàng nhanh chóng.",
  ];

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Lỗi", "Bạn cần cấp quyền truy cập thư viện ảnh để sử dụng tính năng này.");
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !description || !price || !image || !category || !rating) {
        Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("rating", rating);

    if (image) {
        formData.append("image", {
            uri: image,
            type: "image/jpeg", 
            name: "upload.jpg",  
        });
    }

    console.log("Dữ liệu gửi đi:", formData);

    try {
      const response = await fetch("http://172.16.55.134:4000/products/add", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",  
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        Alert.alert("Thành công", "Sản phẩm đã được thêm!");
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        Alert.alert("Lỗi", error.message);
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm sản phẩm</Text>

      <TextInput style={styles.input} placeholder="Tên sản phẩm" value={name} onChangeText={setName} />
      <View style={styles.pickerContainer}>
        <Picker selectedValue={description} onValueChange={(itemValue) => setDescription(itemValue)} style={styles.picker}>
          <Picker.Item label="Chọn mô tả sản phẩm" value="" />
          {descriptions.map((desc, index) => (
            <Picker.Item key={index} label={desc} value={desc} />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Hoặc nhập mô tả riêng..."
        value={description}
        onChangeText={setDescription}
      />
      <TextInput style={styles.input} placeholder="Giá sản phẩm" keyboardType="numeric" value={price} onChangeText={setPrice} />

    
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Chọn ảnh từ thư viện</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.imagePicker} onPress={takePhoto}>
        <Text style={styles.imagePickerText}>Chụp ảnh</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <View style={styles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)} style={styles.picker}>
          <Picker.Item label="Chọn danh mục" value="" />
          {categories.map((cat, index) => (
            <Picker.Item key={index} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

     
      <View style={styles.pickerContainer}>
        <Picker selectedValue={rating} onValueChange={(itemValue) => setRating(itemValue)} style={styles.picker}>
          <Picker.Item label="Chọn đánh giá (1 - 5 sao)" value="" />
          {ratings.map((rate, index) => (
            <Picker.Item key={index} label={`${rate} sao`} value={rate} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddProductScreen;
