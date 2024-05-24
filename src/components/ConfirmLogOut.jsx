import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
const LogOut = () => {
  const [isModalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation()
  

  const handleLogout = async () => {
    await AsyncStorage.clear()
    navigation.navigate('Login')
    console.log("Logged out");
    
  };
  
  const handleCancel = () => {
    navigation.navigate("Settings");
   
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={toggleModal} style={styles.showButton}>
        <Text style={styles.showButtonText}>Logout</Text>
      </TouchableOpacity> */}
      <Modal isVisible={isModalVisible} >
        <View style={styles.modalContent}>
          <Image
            source={{
              uri: "https://img.icons8.com/color/48/000000/shutdown.png",
            }}
            style={styles.icon}
          />
          <Text style={styles.title}>Confirm Logout</Text>
          <Text style={styles.message}>Are you sure you want to log out?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleCancel}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogout}
              style={[styles.button, styles.logoutButton]}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  showButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  showButtonText: {
    color: "white",
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: "#FFCC00",
  },
  logoutButton: {
    backgroundColor: "#FF0000",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default LogOut;
