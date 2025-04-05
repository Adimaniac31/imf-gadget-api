// app.js
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import gadgetRoutes from './routes/gadgetRoutes.js';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/gadgets', gadgetRoutes);

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected');

    // 🔽 This will create the table if it doesn't exist
    return sequelize.sync(); 
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
  });
