import { useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../store';

// Typed selector hook — use this instead of plain useSelector
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
