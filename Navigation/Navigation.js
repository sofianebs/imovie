import React from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'

import Home from '../Screens/Home'
import About from '../Screens/About'
import Movie from '../Screens/Movie'
import Acteur from '../Screens/Acteur'

import { FontAwesome } from '@expo/vector-icons';

const options = {
    header: null
};

const HomeStackNavigator = createStackNavigator({
    Home : {
        screen : Home,
        navigationOptions : options
    },
    Movie : {
        screen : Movie,
        navigationOptions : options
    },
    
    Acteur : {
        screen : Acteur , 
        navigationOptions : options
    }

})

const TabNavigator = createBottomTabNavigator({

        Home: {
            screen: HomeStackNavigator,
            navigationOptions: {
                title: 'Accueil',
                tabBarIcon: ({tintColor}) => {
                    return <FontAwesome name="home" size={20} color={tintColor} />
                }

            }
        },

        Settings : {
            screen: About,
            navigationOptions: {
                title: 'A propos',
                tabBarIcon: ({tintColor}) => {
                    return <FontAwesome name="cog" size={20} color={tintColor} />
                }
            }
        }
    },

    {
        tabBarOptions: {
            activeBackgroundColor: 'white',
            inactiveBackgroundColor: '#0000',
            activeTintColor : 'red' ,
            inactiveTintColor : '#a0a0a0',
            showLabel: true,
            showIcon: true
        }
    }
);

export default createAppContainer(TabNavigator)

