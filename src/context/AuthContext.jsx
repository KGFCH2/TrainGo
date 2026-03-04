import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('wb_user');
        return saved ? JSON.parse(saved) : null;
    });

    const [allUsers, setAllUsers] = useState(() => {
        const saved = localStorage.getItem('wb_users');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('wb_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('wb_user');
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('wb_users', JSON.stringify(allUsers));
    }, [allUsers]);

    const signup = (userData) => {
        const existing = allUsers.find(u => u.username === userData.username);
        if (existing) {
            return { success: false, message: 'Username already exists' };
        }
        const newUser = {
            ...userData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            bookings: [],
        };
        setAllUsers(prev => [...prev, newUser]);
        setUser(newUser);
        return { success: true };
    };

    const login = (username, password) => {
        const found = allUsers.find(u => u.username === username && u.password === password);
        if (found) {
            setUser(found);
            return { success: true };
        }
        return { success: false, message: 'Invalid username or password' };
    };

    const logout = () => {
        setUser(null);
    };

    const updateProfile = (updates) => {
        if (!user) return;
        const updated = { ...user, ...updates };
        setUser(updated);
        setAllUsers(prev => prev.map(u => u.id === user.id ? updated : u));
    };

    const getAvatar = () => {
        if (!user) return '🚂';
        switch (user.gender) {
            case 'male': return '👨';
            case 'female': return '👩';
            default: return '👤';
        }
    };

    return (
        <AuthContext.Provider value={{
            user, signup, login, logout, updateProfile, getAvatar, isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
