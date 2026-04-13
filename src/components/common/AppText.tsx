import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { Colors, TextStyles } from '../../theme';

type Variant = keyof typeof TextStyles;

type AppTextProps = TextProps & {
  children: React.ReactNode;
  variant?: Variant;
  color?: string;
};

const AppText = ({ style, children, variant = 'body', color, ...props }: AppTextProps) => (
  <Text
    style={[styles.base, TextStyles[variant], color ? { color } : undefined, style]}
    {...props}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  base: {
    color: Colors.textPrimary,
  },
});

export default AppText;
