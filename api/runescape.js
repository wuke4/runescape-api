import axios from 'axios';

export default async function handler(req, res) {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const response = await axios.get(`https://apps.runescape.com/runemetrics/profile/profile?user=${encodeURIComponent(username)}&activities=20`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching RuneScape stats' });
    }
}
