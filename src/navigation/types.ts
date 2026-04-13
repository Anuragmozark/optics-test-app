import type { RouteProp } from '@react-navigation/native';
import type { OcrImage } from '../features/ocr/types';

export type RootStackParamList = {
  // ── Auth ──
  AuthStack: undefined;
  SignIn: undefined;
  SignUp: undefined;

  // ── App ──
  HomeStack: undefined;
  MainTabs: undefined;
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  TextIdentification: undefined;
  TextDetail: {
    image: OcrImage;
  };
  ScrollSwipe: undefined;
  Animation: undefined;
};

export type TextDetailRouteProp = RouteProp<RootStackParamList, 'TextDetail'>;
