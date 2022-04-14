import * as React from 'react';
import {Text, View, Button} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
function Demo() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: insets.bottom,
        marginTop: insets.top,
      }}>
      <Text>This is top text.</Text>
      <Text>This is bottom text1.</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const rootStack = createStackNavigator();

function MyStack() {
  return (
    <rootStack.Navigator>
      <rootStack.Screen
        name="Home"
        options={{headerShown: false}}
        component={({navigation}) => (
          <Button
            title="Home"
            onPress={() => navigation.navigate('Notifications')}></Button>
        )}
      />
      <rootStack.Group options={{presentation: 'modal'}}>
        <rootStack.Screen
          name="Notifications"
          component={() => <Text>Notifications</Text>}
        />
      </rootStack.Group>

      <rootStack.Screen name="Profile" component={() => <Text>Profile</Text>} />
      <rootStack.Screen
        name="Settings"
        component={() => <Text>Settings</Text>}
      />
    </rootStack.Navigator>
  );
}
const Analitics = ({navigation}) => {
  return <Text onPress={() => navigation.navigate('Settings')}>123</Text>;
};
export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // primary: 'rgb(255, 45, 85)',
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false, presentation: 'modal'}}>
        <Stack.Screen name="Home">
          {() => (
            <Tab.Navigator initialRouteName="Analitics" tabBarPosition="top">
              <Tab.Screen
                name="Analitics"
                component={Analitics}
                options={{
                  tabBarInactiveBackgroundColor: 'red',
                  tabBarBadge: 3,
                  tabBarLabelPosition: 'below-icon',
                }}
              />
              <Tab.Screen name="Profile" component={Demo} />
            </Tab.Navigator>
          )}
        </Stack.Screen>

        <Stack.Screen name="Settings" component={Demo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
