import Consultation from '../models/Consultation.js';

export const createConsultation = async (req, res) => {
  try {
    if (!['admin', 'lawyer'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const consultation = await Consultation.create(req.body);
    res.status(201).json({ success: true, consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find();
    res.json({ success: true, consultations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) {
      return res.status(404).json({ success: false, message: 'Consultation not found' });
    }
    res.json({ success: true, consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateConsultation = async (req, res) => {
  try {
    if (!['admin', 'lawyer'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const consultation = await Consultation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!consultation) {
      return res.status(404).json({ success: false, message: 'Consultation not found' });
    }
    res.json({ success: true, consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteConsultation = async (req, res) => {
  try {
    if (!['admin', 'lawyer'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const consultation = await Consultation.findByIdAndDelete(req.params.id);
    if (!consultation) {
      return res.status(404).json({ success: false, message: 'Consultation not found' });
    }
    res.json({ success: true, message: 'Consultation deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategories = (req, res) => {
  res.json({
    success: true,
    categories: [
      'Family Law',
      'Criminal Law',
      'Corporate Law',
      'Real Estate',
      'Employment Law',
      'Intellectual Property',
      'Tax Law',
      'Immigration Law',
      'Personal Injury',
      'General Consultation'
    ]
  });
}; 