import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Todos from "./screens/Todos";

const Drawer = createDrawerNavigator()

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    background: 'white',
  }
}

export default function App() {

  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator>       
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Todos" component={Todos} />
      </Drawer.Navigator>
    </NavigationContainer>
  )

}

