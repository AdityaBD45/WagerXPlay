export async function fetchMatches() {
    try {
      const response = await fetch('https://wagerxplay-api.onrender.com/api/odds');
      if (!response.ok) throw new Error('Failed to fetch matches');
      
      const data = await response.json();
      console.log("Fetched data from backend:", data);  // Now correctly logging the data

      // Return data directly as it's already an array of matches
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error('Error fetching matches:', err);
      return [];
    }
}
