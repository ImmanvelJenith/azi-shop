import React, { useState } from 'react';

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // call password reset API
    console.log('reset for', email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Reset password</button>
    </form>
  );
};

export default PasswordReset;
