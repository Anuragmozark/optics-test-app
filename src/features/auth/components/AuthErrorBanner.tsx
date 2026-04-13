import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Spacing, Radius, FontSize, FontWeight, palette } from '../../../theme';

const AuthErrorBanner = ({ message }: { message: string }) => (
  <View style={styles.container}>
    <Ionicons name="alert-circle-outline" size={18} color={palette.red600} />
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.errorBg,
    borderWidth: 1,
    borderColor: Colors.errorBorder,
    borderRadius: Radius.md + 2,
    padding: Spacing.md,
    marginBottom: Spacing.base,
    gap: Spacing.sm,
  },
  text: { flex: 1, fontSize: FontSize.md, color: palette.red600, fontWeight: FontWeight.medium, lineHeight: 18 },
});

export default AuthErrorBanner;
