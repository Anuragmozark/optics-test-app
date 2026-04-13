import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Controller } from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';
import useSignIn from '../hooks/useSignIn';
import AuthInput from '../components/AuthInput';
import AuthErrorBanner from '../components/AuthErrorBanner';
import AppButton from '../../../components/common/AppButton';
import { RootStackParamList } from '../../../navigation/types';
import { Colors, Gradients, Spacing, Radius, FontSize, FontWeight, TextStyles } from '../../../theme';

const SignInScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { form, onSubmit, isLoading, apiError } = useSignIn();
  const { control, formState: { errors } } = form;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <LinearGradient colors={Gradients.primary} style={styles.hero}>
            <Text style={styles.heroTitle}>Welcome Back</Text>
            <Text style={styles.heroSubtitle}>Sign in to continue</Text>
          </LinearGradient>

          <View style={styles.card}>
            {apiError ? <AuthErrorBanner message={apiError} /> : null}

            <Controller control={control} name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <AuthInput label="Email" placeholder="you@example.com" keyboardType="email-address"
                  onChangeText={onChange} onBlur={onBlur} value={value} error={errors.email?.message} />
              )}
            />
            <Controller control={control} name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <AuthInput label="Password" placeholder="Enter your password" isPassword
                  onChangeText={onChange} onBlur={onBlur} value={value} error={errors.password?.message} />
              )}
            />

            <TouchableOpacity style={styles.forgot}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            <AppButton label="Sign In" onPress={onSubmit} loading={isLoading} />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.footerLink}>Sign Up</Text>
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
  forgot:     { alignSelf: 'flex-end', marginBottom: Spacing.xl, marginTop: -Spacing.sm },
  forgotText: { fontSize: FontSize.md, color: Colors.primary, fontWeight: FontWeight.semibold },
  footer:     { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
  footerText: { fontSize: FontSize.base, color: Colors.textSecondary },
  footerLink: { fontSize: FontSize.base, color: Colors.primary, fontWeight: FontWeight.bold },
});

export default SignInScreen;
