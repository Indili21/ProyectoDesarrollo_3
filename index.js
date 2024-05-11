console. clear();
import { createServer } from 'http';

const httpServer = createServer((req,res) => {
  console.log ("INICIO.html")
  res.end("recibido"); 
});

httpServer.listen(3000);
