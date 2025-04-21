### START HERE

**make sure you replace the EXPO_PUBLIC_IP_ADDRESS in .env with your own**

**use ```ipconfig``` in a terminal to find your ip address**

## Frontend:

if prompted when running the below commands, use ```npx expo install```


run ```npm install expo react-native-vector-icons expo-router axios --save-dev @types/axios expo-splash-screen react-native-vector-icons react-native-element-dropdown @react-native-async-storage/async-storage```

run ```npx expo install react-native-maps```

run ```npm start``` to get expo to appear

download expo-go on your moblie device and scan the QR code

use ```r``` to reload for quick testing

## Backend:

run ```npm install mongodb express cors```


whitelist yourself on mongoDB

cd into the server directory

run ```node --env-file=config.env server```
