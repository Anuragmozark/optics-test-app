import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ─── Types ────────────────────────────────────────────────────────────────────

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  /** Tint color for back icon + text. Defaults to dark. */
  tintColor?: string;
  /** Background color of the header bar. Defaults to transparent. */
  backgroundColor?: string;
  /** Extra style for the outer container */
  style?: ViewStyle;
  /** Right-side action slot */
  rightAction?: React.ReactNode;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const ANDROID_STATUS_BAR = StatusBar.currentHeight ?? 24;
// iOS safe area top is handled by SafeAreaView in the parent screen.
// We only need to compensate on Android where SafeAreaView doesn't cover the status bar.
const HEADER_TOP_PADDING = Platform.OS === 'android' ? ANDROID_STATUS_BAR + 8 : 12;
const HEADER_BOTTOM_PADDING = 12;

// ─── Component ────────────────────────────────────────────────────────────────

const ScreenHeader = ({
  title,
  subtitle,
  showBack = true,
  onBack,
  tintColor = '#1a202c',
  backgroundColor = 'transparent',
  style,
  rightAction,
}: ScreenHeaderProps) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor, paddingTop: HEADER_TOP_PADDING }, style]}>
      {/* Left: back button */}
      <View style={styles.side}>
        {showBack && (
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.65}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.backButton}
          >
            <Ionicons
              name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
              size={26}
              color={tintColor}
            />
            {Platform.OS === 'ios' && (
              <Text style={[styles.backLabel, { color: tintColor }]}>Back</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Center: title + subtitle */}
      <View style={styles.center}>
        <Text style={[styles.title, { color: tintColor }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: tintColor }]} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {/* Right: optional action */}
      <View style={styles.side}>{rightAction ?? null}</View>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: HEADER_BOTTOM_PADDING,
    width: '100%',
  },
  side: {
    width: 72,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backLabel: {
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.65,
    marginTop: 2,
  },
});

export default ScreenHeader;
