import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '../../../theme';

type AuthInputProps = TextInputProps & {
  label: string;
  error?: string;
  isPassword?: boolean;
};

const AuthInput = ({ label, error, isPassword = false, ...inputProps }: AuthInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.row, error ? styles.rowError : styles.rowDefault]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={isPassword && !visible}
          autoCapitalize="none"
          autoCorrect={false}
          {...inputProps}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setVisible(v => !v)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.eye}
          >
            <Ionicons name={visible ? 'eye-off-outline' : 'eye-outline'} size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: Spacing.base },
  label: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textPrimary, marginBottom: Spacing.xs + 2 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Radius.lg,
    backgroundColor: Colors.backgroundInput,
    paddingHorizontal: Spacing.md,
  },
  rowDefault: { borderColor: Colors.border },
  rowError:   { borderColor: Colors.borderError },
  input: { flex: 1, height: 50, fontSize: FontSize.lg, color: Colors.textPrimary },
  eye: { paddingLeft: Spacing.sm },
  error: { marginTop: Spacing.xs, fontSize: FontSize.sm, color: Colors.error, fontWeight: FontWeight.medium },
});

export default AuthInput;
