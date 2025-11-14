const express = require('express');
const bodyParser = require('body-parser');
const bugRoutes = require('./routes/bugRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(bodyParser.json());
app.use('/api/bugs', bugRoutes);
app.use(errorHandler);

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server listening on ${port}`));
}

module.exports = app; // export for testing
