import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function OAuthSuccess() {
    const [searchParams] = useSearchParams();
    const { loginWithToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            loginWithToken(token)
                .then(() => {
                    navigate('/user/home');
                })
                .catch((err) => {
                    console.error('Login failed', err);
                    navigate('/login?error=oauth_failed');
                });
        } else {
            navigate('/login');
        }
    }, [searchParams, loginWithToken, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
}
