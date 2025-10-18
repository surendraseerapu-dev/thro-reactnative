// hooks/usePermission.js
import {useCallback} from 'react';
import {Linking} from 'react-native';
import {check, request, RESULTS} from 'react-native-permissions';

export const usePermission = () => {
  const checkAndRequest = useCallback(
    async (permissions = [], {onGranted, onDenied, onBlocked} = {}) => {
      try {
        if (!permissions.length) throw new Error('No permissions provided');

        const checkResults = await Promise.all(
          permissions.map(permission => check(permission)),
        );

        if (checkResults.every(result => result === RESULTS.GRANTED)) {
          onGranted?.();
          return RESULTS.GRANTED;
        }

        const requestResults = await Promise.all(
          permissions.map(permission => request(permission)),
        );

        if (requestResults.every(result => result === RESULTS.GRANTED)) {
          onGranted?.();
          return RESULTS.GRANTED;
        }

        if (requestResults.some(result => result === RESULTS.BLOCKED)) {
          onBlocked?.();
          Linking.openSettings();
          return RESULTS.BLOCKED;
        }

        onDenied?.();
        return RESULTS.DENIED;
      } catch (err) {
        console.error('Permission error:', err);
        return null;
      }
    },
    [],
  );

  return {checkAndRequest};
};
