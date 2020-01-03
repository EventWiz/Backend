import dd from 'debug';
import dotenv from 'dotenv';
import server from './api/server';

dotenv.config();
const debug = dd('App');

const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
  console.log(PORT);
  debug(`server live at localhost:${PORT}`);
});
