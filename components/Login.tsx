
import React, { useState } from 'react';
import Button from './common/Button';
import { ArrowTrendingUpIcon } from './common/icons';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-slate-800 p-3 rounded-full mb-4 border border-slate-700">
                 <ArrowTrendingUpIcon className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-white">InProve</h1>
            <p className="text-slate-400 mt-2">Industrial Improvement, Measured.</p>
        </div>
        
        <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Email / Team ID
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full bg-slate-900 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full bg-slate-900 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="mt-8">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
