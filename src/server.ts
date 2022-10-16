import { httpServer } from './app';

import './websocket';

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
