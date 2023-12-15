import http  from 'http';
import path , {dirname} from 'path';
import { fileURLToPath } from 'url';

import { serveStaticFile } from './Utilities.js';


const __dirname = dirname(fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
    const basePath = path.resolve(__dirname, 'src');

    

    if (req.url.startsWith('/static')) {
        const filePath = path.join(basePath, req.url);
        serveStaticFile(filePath, res);
        console.log(filePath);
        return;
    }

    if (req.url.startsWith('/Components')) {
        const filePath = path.join(basePath, req.url);
        serveStaticFile(filePath, res);
        console.log(filePath);
        return;
    }
  
    //Redirect all requests to index.html
    const indexPath = path.join(basePath, 'index.html');
    console.log(indexPath);
    serveStaticFile(indexPath, res);
    
  
});

const PORT = 5600;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
