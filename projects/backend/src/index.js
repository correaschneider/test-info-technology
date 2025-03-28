const express = require('express');
const cors = require('cors');
const vehicleRoutes = require('./routes/vehicleRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/vehicles', vehicleRoutes);

// Error handler
app.use(errorHandler);

// Only start the server if this file is executed directly (not imported as a module)
if (require.main === module) {
  const PORT = process.env.NODE_PORT || 3000;
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
