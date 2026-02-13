import { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const data = await authService.getCurrentUser();
                    setUser(data.user);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                localStorage.removeItem('token');
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        const data = await authService.login(email, password);
        setUser(data.user);
        setIsAuthenticated(true);
        return data;
    };

    const googleLogin = async (credential) => {
        const data = await authService.googleLogin(credential);
        setUser(data.user);
        setIsAuthenticated(true);
        return data;
    };

    const loginWithToken = async (token) => {
        localStorage.setItem('token', token);
        const data = await authService.getCurrentUser();
        setUser(data.user);
        setIsAuthenticated(true);
        return data;
    };

    const githubLogin = async (credential) => {
        const data = await authService.githubLogin(credential);
        setUser(data.user);
        setIsAuthenticated(true);
        return data;
    };

    const register = async (userData) => {
        const data = await authService.register(userData);
        setUser(data.user);
        setIsAuthenticated(true);
        return data;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    const updateProfile = async (userData) => {
        const data = await authService.updateProfile(userData);
        setUser(data.user);
        return data;
    };

    const uploadAvatar = async (file) => {
        const data = await authService.uploadAvatar(file);
        setUser(data.user);
        return data;
    };

    const refreshUser = async () => {
        try {
            const data = await authService.getCurrentUser();
            setUser(data.user);
            setIsAuthenticated(true);
            return data;
        } catch (error) {
            console.error("Failed to refresh user:", error);
            // Optionally handle logout if token is invalid, but maybe not for just a refresh attempt
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, googleLogin, loginWithToken, githubLogin, register, logout, updateProfile, uploadAvatar, refreshUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
