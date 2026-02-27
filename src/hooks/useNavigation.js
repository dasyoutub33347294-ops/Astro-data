import { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';

/**
 * Re-exporting the context hook for cleaner imports in components.
 * This allows: import { useNavigation } from '../hooks/useNavigation';
 */
export { useNavigation } from '../context/NavigationContext';
