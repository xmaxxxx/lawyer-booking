import TimeSlot from '../models/TimeSlot.js';

export const createTimeSlot = async (req, res) => {
  try {
    if (!['admin', 'lawyer'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const timeSlot = await TimeSlot.create(req.body);
    await timeSlot.populate('consultationType');
    res.status(201).json({ success: true, timeSlot });
  } catch (error) {
    console.error('Create TimeSlot Error:', error); // Log the real error
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getTimeSlots = async (req, res) => {
  try {
    const timeSlots = await TimeSlot.find().populate('consultationType');
    res.json({ success: true, timeSlots });
  } catch {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getTimeSlot = async (req, res) => {
  try {
    const timeSlot = await TimeSlot.findById(req.params.id).populate('consultationType');
    if (!timeSlot) {
      return res.status(404).json({ success: false, message: 'Time slot not found' });
    }
    res.json({ success: true, timeSlot });
  } catch {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateTimeSlot = async (req, res) => {
  try {
    if (!['admin', 'lawyer'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const timeSlot = await TimeSlot.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('consultationType');
    if (!timeSlot) {
      return res.status(404).json({ success: false, message: 'Time slot not found' });
    }
    res.json({ success: true, timeSlot });
  } catch {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteTimeSlot = async (req, res) => {
  try {
    if (!['admin', 'lawyer'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const timeSlot = await TimeSlot.findByIdAndDelete(req.params.id);
    if (!timeSlot) {
      return res.status(404).json({ success: false, message: 'Time slot not found' });
    }
    res.json({ success: true, message: 'Time slot deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const createRecurringSlots = async (req, res) => {
  try {
    if (!['admin', 'lawyer'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const { startDate, endDate, recurringDays, ...slotData } = req.body;
    if (!startDate || !endDate || !recurringDays || !Array.isArray(recurringDays)) {
      return res.status(400).json({ success: false, message: 'Missing required fields for recurring slots' });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const createdSlots = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayName = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      if (recurringDays.includes(dayName)) {
        const slot = await TimeSlot.create({
          ...slotData,
          date: new Date(d),
          isRecurring: true,
          recurringDays
        });
        createdSlots.push(slot);
      }
    }
    res.status(201).json({ success: true, created: createdSlots.length, slots: createdSlots });
  } catch {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}; 