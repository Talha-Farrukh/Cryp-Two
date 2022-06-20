import { SimpleLineIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PortfolioHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.wallet}>
        <Text style={styles.walletText}>$56,900,000</Text>
        <TouchableOpacity style={styles.walleticon}>
          <SimpleLineIcons name="wallet" size={22} color="white" />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          width: "90%",
          justifyContent: "flex-start",
          color: "#ffff",
          marginBottom: "10%",
        }}
      >
        +192% all time
      </Text>
    </View>
  );
};

export default PortfolioHeader;

const styles = StyleSheet.create({
  header: {
    // height: "30%",
    paddingTop: "5%",
    alignItems: "center",
  },
  headerTopButton: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "rgba(251, 251, 251, 0.158)",
  },
  buttonText: {
    color: "#ffff",
    fontSize: Platform.OS === "android" ? 12 : 15,
    padding: 7,
    fontFamily: "Montserrat",
    opacity: 0.5,
  },
  wallet: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "12%",
  },
  walletText: {
    color: "#ffff",
    fontSize: 30,
  },
  walleticon: {
    backgroundColor: "rgba(251, 251, 251, 0.158)",
    borderRadius: 22,
    padding: 10,
  },
});
