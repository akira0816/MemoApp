import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MemoDetailScreen from "./src/screens/MemoDetailScreen";
import LogInScreen from "./src/screens/LogInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import MemoCreateScreen from "./src/screens/MemoCreateScreen";
import MemoEditScreen from "./src/screens/MemoEditScreen";
import MemoListScreen from "./src/screens/MemoListScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#467FD3",
          },
          headerTitleStyle: {
            color: "#FFFFFF",
          },
          headerTitle: "Memo App",
          headerTintColor: "#FFF",
          headerBackTitle: "back",
          animation: "slide_from_right",
          //反映されない↓
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen name="MemoList" component={MemoListScreen} />
        <Stack.Screen name="MemoDetail" component={MemoDetailScreen} />
        <Stack.Screen name="MemoEdit" component={MemoEditScreen} />
        <Stack.Screen name="MemoCreate" component={MemoCreateScreen} />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            animation: "fade",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
