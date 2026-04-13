import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Colors, FontSize, FontWeight, Shadows, Gradients } from '../../theme';
import TabNavigator from '../TabNavigator';
import { OcrScreen, OcrDetailScreen } from '../../features/ocr';
import { ScrollSwipeScreen } from '../../features/scrollSwipe';
import { AnimationScreen } from '../../features/animation';
import BackButton from '../../components/common/BackButton';

const Stack = createStackNavigator<RootStackParamList>();

const sharedHeader = {
  headerShown: true,
  headerStyle: { backgroundColor: Colors.backgroundCard, ...Shadows.header },
  headerTitleStyle: { fontSize: FontSize.xl, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  headerLeft: () => <BackButton color={Colors.textPrimary} />,
};

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={TabNavigator} />
    <Stack.Screen name="TextIdentification" component={OcrScreen}      options={{ ...sharedHeader, title: 'Text Identification' }} />
    <Stack.Screen name="TextDetail"         component={OcrDetailScreen} options={{ ...sharedHeader, title: 'OCR Analysis' }} />
    <Stack.Screen name="ScrollSwipe"        component={ScrollSwipeScreen} options={{ ...sharedHeader, title: 'Scroll & Swipe' }} />
    <Stack.Screen
      name="Animation"
      component={AnimationScreen}
      options={{
        headerShown: true,
        title: 'Animation Gallery',
        headerStyle: { backgroundColor: Colors.primary, elevation: 0, shadowOpacity: 0 },
        headerTitleStyle: { fontSize: FontSize.xl, fontWeight: FontWeight.semibold, color: Colors.textInverse },
        headerLeft: () => <BackButton color={Colors.textInverse} />,
      }}
    />
  </Stack.Navigator>
);

export default HomeStack;
