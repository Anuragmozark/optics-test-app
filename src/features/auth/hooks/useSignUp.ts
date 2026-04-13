import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../validation/schemas';
import { signUp, clearAuthError } from '../store/authSlice';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import type { SignUpPayload } from '../types';

const useSignUp = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const form = useForm<SignUpPayload>({
    resolver: yupResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    mode: 'onTouched',
  });

  // Clear Redux error when user starts editing again
  useEffect(() => {
    const subscription = form.watch(() => {
      if (error) dispatch(clearAuthError());
    });
    return () => subscription.unsubscribe();
  }, [error, dispatch, form]);

  const onSubmit = form.handleSubmit(async (values: SignUpPayload) => {
    await dispatch(signUp(values));
  });

  return { form, onSubmit, isLoading, apiError: error };
};

export default useSignUp;
