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

        if (response.ok) {
            // handle success (e.g., redirect or show success message)
            window.location.href = `http://${subdomain}`;
        } else {
            const errorData = await response.json();
            alert(errorData.message); // Show the error message from the API
        }
    } catch (error) {
        console.error('Error registering subdomain:', error);
        alert('Error registering subdomain');
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
