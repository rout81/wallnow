import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/homescreen";
import VideoScreen from "../screens/videoScreen";

const Tab = createMaterialBottomTabNavigator();

const FooterNav = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Videos" component={VideoScreen} />
		</Tab.Navigator>
	);
};

export default FooterNav;
