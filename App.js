import * as React from 'react';
import {View, Text, Button, TextInput, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            title: '111',
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }
      />
    </View>
  );
}
function DetailsScreen({navigation, route}) {
  console.log(route.params);
  const [value, onChangeText] = React.useState(route.params.title);
  const {itemId, otherParam} = route.params;
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: value === '' ? 'No title' : value,
  //   });
  // }, [navigation, value]);
  React.useEffect(() => {
    console.log(123);
  });
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text style={{fontSize: 22, fontWeight: 'bold'}}>itemId: {itemId}</Text>
      <Text>otherParam: {otherParam}</Text>
      <TextInput
        style={{height: 40, width: '100%', borderColor: 'gray', borderWidth: 1}}
        onChangeText={onChangeText}
        value={value}
      />
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go DetailMount"
        onPress={() => navigation.navigate('DetailMount')}
      />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

class DetailMount extends React.Component {
  constructor({props, navigation, route}) {
    super(props);
    this.state = {
      itemValue: '123',
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.navigation = navigation;
  }
  componentDidMount() {
    console.log('dom渲染后');
  }
  onChangeText(value) {
    this.setState(
      {
        itemValue: value,
      },
      () => {
        this.navigation.setOptions({
          title: this.state.itemValue,
        });
      },
    );
  }
  render() {
    const {itemValue} = this.state;
    console.log(itemValue);
    return (
      <>
        <View>
          <TextInput
            style={{
              height: 40,
              width: '100%',
              borderColor: 'gray',
              borderWidth: 1,
            }}
            value={itemValue}
            onChangeText={this.onChangeText}></TextInput>
        </View>
      </>
    );
  }
}

const Stack = createNativeStackNavigator();

function App() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? '#000' : '#fff';
  const themeOpposite = scheme !== 'dark' ? '#000' : '#fff';
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Overview',
            headerStyle: {backgroundColor: theme},
            headerTintColor: themeOpposite,
          }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: theme},
            headerTintColor: themeOpposite,
          }}
          name="DetailMount"
          component={DetailMount}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
