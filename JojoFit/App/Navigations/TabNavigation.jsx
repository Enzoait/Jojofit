import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Exercises from '../Screens/ExercisesScreen/Exercises';
import Nutrition from '../Screens/NutritionScreen/Nutrition';
import Profile from '../Screens/ProfileScreen/Profile';
import Challenges from '../Screens/ChallengesScreen/Challenges';
import Colors from '../Utils/Colors';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={
        {headerShown: false, tabBarActiveTintColor: Colors.appblue}
        }>
        <Tab.Screen name="Nutrition" component={Nutrition} options={{tabBarIcon: () => <Image style={styles.iconSize} source={require('../../assets/food.png')}></Image>}}/>
        <Tab.Screen name="Exercises" component={Exercises} options={{tabBarIcon: () => <Image style={styles.iconSize} source={require('../../assets/dumbell.png')}></Image>}}/>
        <Tab.Screen name="Challenges" component={Challenges} options={{tabBarIcon: () => <Image style={styles.iconSize} source={require('../../assets/stopwatch.png')}></Image>}}/>
        <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: () => <Image style={styles.iconSizeProfile} source={require('../../assets/profile.png')}></Image>}}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    iconSize: {
        width: 30,
        height: 30
    },

    iconSizeProfile: {
        width: 25,
        height: 25
    }
})