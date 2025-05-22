import React from 'react';
import { useUser } from './UserContext';
import { useNavigation } from '@react-navigation/native';

export const ProtectedRoute = ({ children, requiredRole, requiredPermission }) =>
{
    const { user, isAdmin, isCustomer, hasPermission } = useUser();
    const navigation = useNavigation();

    React.useEffect(() =>
    {
        if (!user)
        {
            navigation.replace('Login');
            return;
        }

        if (requiredRole && user.role !== requiredRole)
        {
            navigation.replace('Home');
            return;
        }

        if (requiredPermission && !hasPermission(requiredPermission))
        {
            navigation.replace('Home');
            return;
        }
    }, [user, requiredRole, requiredPermission]);

    if (!user) return null;
    if (requiredRole && user.role !== requiredRole) return null;
    if (requiredPermission && !hasPermission(requiredPermission)) return null;

    return children;
}; 