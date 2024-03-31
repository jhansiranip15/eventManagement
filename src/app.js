const express = require('express');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

mongoose.connect('mongodb://localhost:27017/eventManagement', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/events', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
