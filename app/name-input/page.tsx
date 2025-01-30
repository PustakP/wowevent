'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NameInput() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const subdomain = `${name}.catalystiq.fun`;
     try {
        const response = await fetch('/api/register-subdomain', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subdomain }),
        });

         if (response.ok) {  window.location.href = `http://${subdomain}`;} else {alert ('error registering subdomain')}
      } catch (error) {
        console.error('Error registering subdomain:', error);
        alert('error registering subdomain')
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Accept</button>
    </form>
  );
}
