const http = require('http');
const app = require('./app');
// var cron = require("./routes/cronJobs");




const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(PORT,function()
{
    // cron.start();
    // console.log("done");
});

