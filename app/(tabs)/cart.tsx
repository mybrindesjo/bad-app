import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { useCart } from "../../context/CartContext";

const CartScreen: React.FC = () => {
  const { items } = useCart();
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Din varukorg är tom 😢</Text>
        <Text>Svara på frågorna i profilen först!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Din varukorg 🛒</Text>

      {items.map((item, index) => (
        <View key={index} style={styles.itemCard}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.itemDetails}>
            <Text style={styles.item}>{item.name}</Text>
            <Text style={styles.price}>{item.price} kr</Text>
          </View>
        </View>
      ))}

      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Totalt:</Text>
        <Text style={styles.totalAmount}>{totalPrice} kr</Text>
      </View>

      <Button 
        title="Köp nu!" 
        onPress={() => alert("Grattis! Du har köpt totalt ologiska produkter! 😆")} 
        color="#0044CC" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  item: {
    fontSize: 16,
    color: "#000",
  },
  price: {
    fontSize: 16,
    color: "#0044CC",
  },
  totalRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  totalText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0044CC",
  },
});

export default CartScreen;
