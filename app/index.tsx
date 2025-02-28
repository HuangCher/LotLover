import { Redirect } from "expo-router";

export default function Index() {
  const isAuthenticated = false; // fix with real implementation
  
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/map" />; 
  } else {
    return <Redirect href="/(auth)/welcome" />;
  }
}
