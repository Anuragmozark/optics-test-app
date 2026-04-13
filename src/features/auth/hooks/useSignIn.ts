import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema } from '../validation/schemas';
import { signIn, clearAuthError } from '../store/authSlice';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import type { SignInPayload } from '../types';

const useSignIn = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const form = useForm<SignInPayload>({
    resolver: yupResolver(signInSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  // Clear Redux error when user starts editing again
  useEffect(() => {
    const subscription = form.watch(() => {
      if (error) dispatch(clearAuthError());
    });
    return () => subscription.unsubscribe();
  }, [error, dispatch, form]);

  const onSubmit = form.handleSubmit(async (values: SignInPayload) => {
    await dispatch(signIn(values));
  });

  return { form, onSubmit, isLoading, apiError: error };
};

export default useSignIn;
