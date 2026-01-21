import 'dotenv/config';
import { httpServer } from './app';
const PORT = Number(process.env.PORT) || 4000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});