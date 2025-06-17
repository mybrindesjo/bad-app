import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useCart } from "../../context/CartContext";

const CartScreen: React.FC = () => {
  const { items } = useCart();
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Din varukorg är tom</Text>
        <Text style={styles.info}>Svara på frågorna i profilen först!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Din varukorg</Text>

      {items.map((item, index) => (
        <View key={index} style={styles.itemCard}>
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

      <TouchableOpacity 
        style={styles.purchaseButton}
        onPress={() => alert("Grattis! Du har köpt totalt ologiska produkter!")}
      >
        <Text style={styles.purchaseButtonText}>Köp nu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0C0C0",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "Courier",
  },
  header: {
    fontSize: 24,
    color: "#000000",
    marginBottom: 20,
    fontFamily: "Courier",
  },
  info: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 20,
    fontFamily: "Courier",
  },
  itemCard: {
    flexDirection: "row", 
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderRightColor: '#404040',
    borderBottomColor: '#404040',
    borderLeftColor: '#FFFFFF',
    borderTopColor: '#FFFFFF',
    fontFamily: "Courier",
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  item: {
    fontSize: 16,
    color: "#000000",
    fontFamily: "Courier",
  },
  price: {
    fontSize: 16,
    color: "#000000",
    fontFamily: "Courier",
  },
  totalRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  totalText: {
    fontSize: 22,
    color: "#000000",
    fontFamily: "Courier",
  },
  totalAmount: {
    fontSize: 22,
    color: "#000000",
    fontFamily: "Courier",
  },
  purchaseButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
    backgroundColor: '#C0C0C0',
    borderWidth: 2,
    borderRightColor: '#404040',
    borderBottomColor: '#404040',
    borderLeftColor: '#FFFFFF',
    borderTopColor: '#FFFFFF',
    padding: 10,
    width: "100%",
  },
  purchaseButtonText: {
    color: "#000000",
    fontFamily: "Courier",
    fontSize: 16,
  },
});

export default CartScreen;
