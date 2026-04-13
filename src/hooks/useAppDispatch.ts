import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

// Typed dispatch hook — use this instead of plain useDispatch
const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
