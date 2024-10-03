import React, { useEffect, useState } from 'react';

import UserProfile from '../User/UserProfile';

const Auth = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/users', { method: 'GET' });
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find((user) => user.email === email && user.password === password);
        if (user) {
            
            alert(`
                Your login status is ${user.isLoggedIn}
                Welcome ${user.username}
                
                Your department is ${user.department}`);
            
                setIsAuth(true);

            const submitAuth = async () => {
                const loggedUser = {
                    email
                };
                try {
                    const response = await fetch('http://localhost:3000/users/login', {
                        method: 'PUT',  // Changed from POST to PUT
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(loggedUser),  // Directly pass loggedUser, no need for nested object
                    });
                    if (!response.ok) throw new Error('Failed to update auth');
                    const result = await response.json();
                    alert("Logged in successfully");
                    console.log(result);

                    setEmail('');
                    setPassword('');
                } catch (error) {
                    console.error('Error updating auth:', error);
                }
            };

            submitAuth();  // Call the function after login success

        } else {
            alert('Login Failed');
        }
    };

    
    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <>
            {!isAuth ? (
                <UserProfile email={email} initialAuth={isAuth} password={password} users={users} />
            ) : (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            {/* <img src={logo} alt="Company Logo" className="h-[300px] w-[300px]" /> */}
                        </div>

                        {/* Title */}
                        <h2 className="text-center text-2xl font-semibold text-gray-700">Sign in to your account</h2>

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                                Sign In
                            </button>
                        </form>

                        {/* Additional Links */}
                        <div className="text-center text-sm">
                            <a href="#" className="text-blue-500 hover:underline">Forgot your password?</a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Auth;
