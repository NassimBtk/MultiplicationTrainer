import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";

type Props = {
	navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Apprendre les Multiplications</Text>
			<Button
				title="S’entraîner"
				onPress={() => navigation.navigate("Training")}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
});

export default HomeScreen;
