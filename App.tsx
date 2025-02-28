import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import TrainingScreen from "./src/screens/TrainingScreen";

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ title: "Accueil" }}
				/>
				<Stack.Screen
					name="Training"
					component={TrainingScreen}
					options={{ title: "S’entraîner" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
