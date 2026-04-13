import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Spacing, Radius, FontSize, FontWeight, Shadows } from '../../theme';

export type FeatureCardProps = {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  colors: string[];
  onPress: () => void;
};

const FeatureCard = memo(({ title, subtitle, description, icon, colors, onPress }: FeatureCardProps) => (
  <TouchableOpacity style={styles.wrapper} activeOpacity={0.85} onPress={onPress}>
    <LinearGradient colors={colors} style={styles.card} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <View style={styles.content}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.textGroup}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <Text style={styles.arrow}>→</Text>
    </LinearGradient>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: Radius['3xl'],
    overflow: 'hidden',
    marginBottom: Spacing.base + 2,
    ...Shadows.xl,
  },
  card: {
    borderRadius: Radius['3xl'],
    padding: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 130,
  },
  content:   { flex: 1, flexDirection: 'row', alignItems: 'center' },
  icon:      { fontSize: 42, marginRight: Spacing.base + 2 },
  textGroup: { flex: 1 },
  title:       { color: '#fff', fontSize: FontSize['4xl'], fontWeight: FontWeight.bold, marginBottom: Spacing.xs + 2 },
  subtitle:    { color: 'rgba(255,255,255,0.88)', fontSize: FontSize.base, fontWeight: FontWeight.semibold, marginBottom: Spacing.sm + 2 },
  description: { color: 'rgba(255,255,255,0.82)', fontSize: FontSize.md, lineHeight: 20 },
  arrow:       { color: 'rgba(255,255,255,0.95)', fontSize: FontSize['6xl'], fontWeight: FontWeight.black, marginLeft: Spacing.md },
});

export default FeatureCard;
