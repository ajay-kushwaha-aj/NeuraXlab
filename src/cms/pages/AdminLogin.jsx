import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin({ onLoginSuccess, onBackToPublic }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isResetView, setIsResetView] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetRequest = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your administrator email address.');
      return;
    }
    setResetSent(true);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A27] via-[#0F2537] to-[#142E44] flex items-center justify-center p-4">
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full border border-[#C59B27]/40" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full border border-[#8B1E24]/50" />
      </div>

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Back Link */}
        <button
          onClick={onBackToPublic}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-[#E0B84C] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to NeuroXLab Public Website</span>
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#C59B27]/40 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white p-2 border-2 border-[#C59B27]/60 shadow-md flex items-center justify-center">
              <img src="/images/neuroxlab_logo.png" alt="NeuroXLab" className="w-full h-full object-contain" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-mono font-bold mt-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SECURE ACCESS PORTAL</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
              NeuroXLab CMS
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              School of Life Sciences • University of Hyderabad
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {!isResetView ? (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nvprasuja@uohyd.ac.in"
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetView(true);
                      setError('');
                    }}
                    className="text-xs text-[#8B1E24] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24] focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] border border-[#C59B27]/40 shadow-lg hover:shadow-xl transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <LogIn className="w-4 h-4 text-[#E0B84C]" />
                <span>{loading ? 'Authenticating...' : 'Sign In to Admin Dashboard'}</span>
              </button>
            </form>
          ) : (
            /* Reset Form */
            <div className="space-y-4">
              {resetSent ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Instructions Provided</span>
                  </div>
                  <p>
                    If an administrator account with <strong>{email}</strong> exists, password reset instructions have been recorded.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetView(false);
                      setResetSent(false);
                    }}
                    className="text-xs font-bold text-emerald-900 underline mt-2 block"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResetRequest} className="space-y-4">
                  <p className="text-xs text-slate-600">
                    Enter your authorized administrator email to initiate a password reset.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                      Administrator Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nvprasuja@uohyd.ac.in"
                        required
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsResetView(false)}
                      className="w-1/2 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931]"
                    >
                      Request Reset
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Initial Provisioning Credentials Helper Box */}
          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 bg-[#FAF8F5] p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="font-mono font-bold text-[#8B1E24] block uppercase">
              Initial Admin Credentials:
            </span>
            <p><strong>Email:</strong> <code>nvprasuja@uohyd.ac.in</code></p>
            <p><strong>Password:</strong> <code>NeuroXlab@2026</code></p>
            <p className="text-[10px] text-slate-400 pt-1 italic">
              (You may change this password anytime in Administrators &amp; Roles).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

