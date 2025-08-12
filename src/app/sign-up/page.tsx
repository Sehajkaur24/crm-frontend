'use client';
import { useState } from 'react';
import React from 'react';
import { registerAdmin } from '@/api/user-api';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [industry, setIndustry] = useState('');
  const [otherIndustry, setOtherIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    setLoading(true);
    try {
      const finalIndustry = industry === 'Other' ? otherIndustry.trim() : industry;

      await registerAdmin({
        full_name: fullName.trim(),
        email: email.trim(),
        password,
        org_name: organization.trim(),
        industry: finalIndustry,
      });

      setMessage({ type: 'success', text: 'Admin account created successfully!' });

      // Reset fields
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setOrganization('');
      setIndustry('');
      setOtherIndustry('');
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE1E0] to-[#F49BAB] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-[#7F55B1]">Join Our CRM Platform</h1>
          <p className="mt-2 text-sm text-[#7F55B1]">Create your organization account in a few simple steps.</p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm" onSubmit={handleSubmit}>
          <FormInput
            id="name"
            label="Full Name"
            placeholder="Jane Smith"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <FormInput
            id="email"
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <FormInput
            id="organization"
            label="Organization"
            placeholder="ABC Pvt Ltd"
            required
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />

          <div>
            <label className="block text-[#7F55B1] mb-1 font-medium">Industry</label>
            <select
              className="w-full px-4 py-2 border border-[#9B7EBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F49BAB]"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            >
              <option value="">Select Industry</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {industry === 'Other' && (
            <FormInput
              id="otherIndustry"
              label="Enter your industry"
              placeholder="Your Industry"
              required
              value={otherIndustry}
              onChange={(e) => setOtherIndustry(e.target.value)}
            />
          )}

          <div className="col-span-2">
            <label className="inline-flex items-start gap-2">
              <input type="checkbox" className="mt-1" required />
              <span className="text-sm text-[#7F55B1]">
                I accept the <a href="#" className="text-[#F49BAB] underline">Terms & Conditions</a>
              </span>
            </label>
          </div>

          {message && (
            <div className={`col-span-2 text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
              {message.text}
            </div>
          )}

          <div className="col-span-2">
            <Button
              type="submit"
              text={loading ? 'Creating Account...' : 'Create CRM Account'}
              variant="primary"
            />
          </div>

          <div className="col-span-2 text-center text-[#7F55B1] text-sm mt-2">
            Already have an account?{" "}
            <span className="text-[#F49BAB] font-medium hover:underline cursor-pointer">
              Log in
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
