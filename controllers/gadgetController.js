import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import Gadget from '../models/gadget.js';

// Utility: Random codename generator
const codenames = [
    'The Nightingale', 'The Kraken', 'Shadow Dagger', 'Phantom Hawk', 'Ghost Protocol',
    'Sage', 'Jett', 'Phoenix', 'Cypher', 'Killjoy', 'Breach', 'Omen', 'Skye',
    'Reyna', 'Chamber', 'Neon', 'Yoru', 'Viper', 'Brimstone', 'Sova', 'Harbor', 'Iso'
  ];
const getRandomCodename = () => codenames[Math.floor(Math.random() * codenames.length)];

// Utility: Random success probability
const getRandomSuccessProbability = () => `${Math.floor(Math.random() * 51) + 50}%`; // 50-100%

// ✅ GET /gadgets
export const getAllGadgets = async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};

    const gadgets = await Gadget.findAll({ where });

    const gadgetsWithProbability = gadgets.map(g => ({
      ...g.toJSON(),
      missionSuccessProbability: getRandomSuccessProbability()
    }));

    res.json(gadgetsWithProbability);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ POST /gadgets
export const createGadget = async (req, res) => {
  try {
    const { name, status } = req.body;
    const codename = getRandomCodename();
    const gadget = await Gadget.create({
      id: uuidv4(),
      name,
      codename,
      status: status || 'Available'
    });

    res.status(201).json({ message: 'Gadget added', gadget });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ PATCH /gadgets/:id
export const updateGadget = async (req, res) => {
    try {
      const { id } = req.params;
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'No data provided for update' });
      }
  
      const gadget = await Gadget.findByPk(id);
      if (!gadget) return res.status(404).json({ error: 'Gadget not found' });
  
      if (gadget.status === 'Decommissioned') {
        return res.status(400).json({ error: 'Cannot update a decommissioned gadget' });
      }
  
      await gadget.update(req.body);
      res.json({ message: 'Gadget updated', gadget });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// ✅ DELETE /gadgets/:id (Soft delete)
export const deleteGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ error: 'Gadget not found' });

    gadget.status = 'Decommissioned';
    gadget.decommissionedAt = new Date();
    await gadget.save();

    res.json({ message: 'Gadget decommissioned', gadget });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ POST /gadgets/:id/self-destruct
export const triggerSelfDestruct = async (req, res) => {
    try {
      const { id } = req.params;
      const gadget = await Gadget.findByPk(id);
      if (!gadget) return res.status(404).json({ error: 'Gadget not found' });
  
      if (gadget.status === 'Destroyed') {
        return res.status(400).json({ error: 'Gadget already destroyed' });
      }
  
      // Simulate destruction
      gadget.status = 'Destroyed';
      gadget.decommissionedAt = new Date();
      await gadget.save();
  
      const confirmationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
      res.json({ message: 'Gadget destroyed. Confirmation code generated.', confirmationCode });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  export const restoreGadget = async (req, res) => {
    try {
      const { id } = req.params;
      const gadget = await Gadget.findByPk(id);
      if (!gadget) return res.status(404).json({ error: 'Gadget not found' });
  
      if (gadget.status === 'Destroyed') {
        return res.status(400).json({ error: 'Destroyed gadgets cannot be restored' });
      }
  
      if (gadget.status !== 'Decommissioned') {
        return res.status(400).json({ error: 'Only decommissioned gadgets can be restored' });
      }
  
      gadget.status = 'Available';
      gadget.decommissionedAt = null;
      await gadget.save();
  
      res.json({ message: 'Gadget restored', gadget });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
