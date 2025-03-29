import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "./UserContext";
import styles from "./stylesEditFrofile";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext);

  const [name, setName] = useState(userData.name);
  const [address, setAddress] = useState(userData.address);
  const [avatar, setAvatar] = useState(userData.avatar);
  const [birthdate, setBirthdate] = useState(userData.birthdate);
  const [showPicker, setShowPicker] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setUserData({ name, address, avatar, birthdate });
    navigation.goBack();
  };

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setBirthdate(selectedDate);
    }
    setShowPicker(Platform.OS === "ios");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: avatar }} style={styles.profileImage} />
      </TouchableOpacity>
      
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nhập tên của bạn" />
      <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Nhập địa chỉ" />

      <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.datePickerText}>{birthdate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={birthdate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;
