import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Controller } from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';
import useSignUp from '../hooks/useSignUp';
import AuthInput from '../components/AuthInput';
import AuthErrorBanner from '../components/AuthErrorBanner';
import AppButton from '../../../components/common/AppButton';
import { RootStackParamList } from '../../../navigation/types';
import { Colors, Gradients, Spacing, Radius, FontSize, FontWeight, TextStyles } from '../../../theme';

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { form, onSubmit, isLoading, apiError } = useSignUp();
  const { control, formState: { errors } } = form;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <LinearGradient colors={Gradients.secondary} style={styles.hero}>
            <Text style={styles.heroTitle}>Create Account</Text>
            <Text style={styles.heroSubtitle}>Join us today — it's free</Text>
          </LinearGradient>

          <View style={styles.card}>
            {apiError ? <AuthErrorBanner message={apiError} /> : null}

            <Controller control={control} name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <AuthInput label="Full Name" placeholder="John Doe" autoCapitalize="words"
                  onChangeText={onChange} onBlur={onBlur} value={value} error={errors.name?.message} />
              )}
            />
            <Controller control={control} name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <AuthInput label="Email" placeholder="you@example.com" keyboardType="email-address"
                  onChangeText={onChange} onBlur={onBlur} value={value} error={errors.email?.message} />
              )}
            />
            <Controller control={control} name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <AuthInput label="Password" placeholder="Min 8 chars, 1 uppercase, 1 number" isPassword
                  onChangeText={onChange} onBlur={onBlur} value={value} error={errors.password?.message} />
              )}
            />
            <Controller control={control} name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <AuthInput label="Confirm Password" placeholder="Re-enter your password" isPassword
                  onChangeText={onChange} onBlur={onBlur} value={value} error={errors.confirmPassword?.message} />
              )}
            />

            <AppButton label="Create Account" onPress={onSubmit} loading={isLoading} variant="secondary" style={styles.btn} />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.footerLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  flex:     { flex: 1 },
  scroll:   { flexGrow: 1 },
  hero: {
    paddingTop: Spacing['5xl'],
    paddingBottom: Spacing['4xl'] + 10,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
  },
  heroTitle:    { ...TextStyles.h1, color: Colors.textInverse, marginBottom: Spacing.xs },
  heroSubtitle: { fontSize: FontSize.lg, color: 'rgba(255,255,255,0.85)', fontWeight: FontWeight.medium },
  card: {
    flex: 1,
    backgroundColor: Colors.backgroundCard,
    borderTopLeftRadius: Radius['4xl'],
    borderTopRightRadius: Radius['4xl'],
    marginTop: -Spacing.xl,
    padding: Spacing.xl,
    paddingTop: Spacing['2xl'],
  },
  btn:        { marginTop: Spacing.sm },
  footer:     { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
  footerText: { fontSize: FontSize.base, color: Colors.textSecondary },
  footerLink: { fontSize: FontSize.base, color: Colors.secondary, fontWeight: FontWeight.bold },
});

export default SignUpScreen;
