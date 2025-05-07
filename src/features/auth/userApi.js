export const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
  
    const response = await fetch('https://wagerxplay-api.onrender.com/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user info');
    }
  
    return response.json();
  };
  