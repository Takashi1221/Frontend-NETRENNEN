export default function handler(req, res) {
    try {
      const { email, password } = req.body;
  
      const adminEmail = 'input@example.com';
      const adminPassword = 'passinput';
  
      if (email === adminEmail && password === adminPassword) {
        res.status(200).json({ message: 'Authenticated' });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      console.error('Error processing request', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }