const express = require('express');

const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, './public/build')));
const Signup = require('./routes/Signup');
const Signin = require('./routes/Signin');
const Subscription = require('./routes/Subscription');
const RegisterApplicationDetails = require('./routes/register-application-details');
const RegisterYaml = require('./routes/register-yaml');
const RenderTable = require('./routes/RenderTable');
const GenerateToken = require('./routes/generate-register-token');
const NameRegitser = require('./routes/register-without-yaml');
const Search = require('./routes/Search');
const Client = require('./routes/client-registraion');
const Version = require("./routes/generate-version");
const Serve = require("./routes/server");
const VersionDisplay = require("./routes/version");
const VersionLatest = require("./routes/version_latest");
const VersionCount = require("./routes/version_count");
const UserProfile = require("./routes/user-profile");

// Routes which should handle requests
app.use('/Signup', Signup);
app.use('/login', Signin);
app.use('/register-yaml', RegisterYaml);
app.use('/get_data', GenerateToken);
app.use('/register-name', RegisterApplicationDetails);
app.use('/subscription', Subscription);
app.use('/render-table', RenderTable);
app.use('/register', NameRegitser);
app.use('/search', Search);
app.use('/client-publish', Client);
app.use('/get-version-token', Version);
app.use('/server', Serve);
app.use('/version', VersionDisplay);
app.use("/version-latest", VersionLatest);
app.use("/count", VersionCount);
app.use('/user-profile', UserProfile);
module.exports = app;
