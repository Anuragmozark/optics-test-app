import React, { memo, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import FeatureCard from '../components/ui/FeatureCard';
import { RootStackParamList } from '../navigation/types';
import { Colors, Gradients, Spacing, FontSize, FontWeight, TextStyles } from '../theme';

// ─── Static config — move to a constants file if features grow ───────────────
const FEATURE_CARDS: Array<{
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string[];
  screen: keyof RootStackParamList;
}> = [
  {
    id: 'ocr',
    title: 'Text Identification',
    subtitle: 'OCR & Text Recognition',
    description: 'Tap the invoice image to start a text extraction workflow.',
    icon: '📝',
    gradient: Gradients.primary,
    screen: 'TextIdentification',
  },
  {
    id: 'scroll',
    title: 'Scroll & Swipe',
    subtitle: 'List + Interaction Playground',
    description: 'Explore a scrollable task panel and add new list items on the fly.',
    icon: '🎯',
    gradient: Gradients.secondary,
    screen: 'ScrollSwipe',
  },
  {
    id: 'animation',
    title: 'Animation Lab',
    subtitle: 'Loader & Motion Tests',
    description: 'Inspect polished loading animations inspired by InstaBIZ flows.',
    icon: '✨',
    gradient: Gradients.success,
    screen: 'Animation',
  },
];

const HomeScreen = memo(() => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.title}>Optics Super App</Text>
          <Text style={styles.subtitle}>Framework validation & quick interaction tests.</Text>
        </View>

        <View style={styles.cards}>
          {FEATURE_CARDS.map(card => (
            <FeatureCard
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              description={card.description}
              icon={card.icon}
              colors={card.gradient}
              onPress={() => navigation.navigate(card.screen as any)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Designed for rapid QA</Text>
          <Text style={styles.footerText}>
            Each card launches a complete testing flow with real content and interactive controls.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll:    { flexGrow: 1, padding: Spacing.lg },
  header:    { alignItems: 'center', marginBottom: Spacing['2xl'] + 2, marginTop: Spacing.lg },
  title:     { ...TextStyles.h1, color: Colors.textPrimary, marginBottom: Spacing.sm },
  subtitle:  { fontSize: FontSize.lg, color: Colors.textSecondary, fontWeight: FontWeight.medium, textAlign: 'center', lineHeight: 22, maxWidth: 320 },
  cards:     { marginBottom: Spacing.lg },
  footer:    { marginTop: Spacing['2xl'], alignItems: 'center' },
  footerTitle: { ...TextStyles.h4, color: Colors.textPrimary, marginBottom: Spacing.sm },
  footerText:  { fontSize: FontSize.base, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22, maxWidth: 320 },
});

export default HomeScreen;
