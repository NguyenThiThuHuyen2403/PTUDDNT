import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) =>
{
    const [user, setUser] = useState(null);

    const isAdmin = () =>
    {
        return user?.role === 'admin';
    };

    const isCustomer = () =>
    {
        return user?.role === 'customer';
    };

    const hasPermission = (permission) =>
    {
        if (!user) return false;

        const adminPermissions = [
            'manage_services',
            'manage_transactions',
            'manage_customers',
            'manage_profile'
        ];

        const customerPermissions = [
            'view_services',
            'book_appointments',
            'manage_appointments',
            'manage_profile'
        ];

        const userPermissions = user.role === 'admin' ? adminPermissions : customerPermissions;
        return userPermissions.includes(permission);
    };

    return (
        <UserContext.Provider value={{ user, setUser, isAdmin, isCustomer, hasPermission }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext); 