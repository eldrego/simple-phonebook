import { validationResult } from 'express-validator/check';
import regeneratorRuntime from 'regenerator-runtime';
import { Contact } from '../models/Contact';

exports.create = async (req, res) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'An error has occurred',
        errors: errors.array()
      });
    }

    const { user } = req.decoded;
    req.body.owner = user.id;

    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    if (savedContact) {
      res.status(201).json({
        success: true,
        message: 'success',
        contact: savedContact,
      });
    }
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An error has occurred',
        error: `${error.message}`,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'An error has occurred',
      error: `${error}`,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { user } = req.decoded;
    const contacts = await Contact.find({ owner: user.id });
    if (contacts) {
      res.status(200).json({
        success: true,
        message: 'success',
        contacts,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error has occurred',
      error: `${error}`,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { user } = req.decoded;
    const contact = await Contact.findOne({
      _id: req.params.id,
      owner: user.id
    });

    if (contact) {
      res.status(200).json({
        success: true,
        message: 'success',
        contacts: contact,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error has occurred',
      error: `${error}`,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'An error has occurred',
        errors: errors.array()
      });
    }

    const { user } = req.decoded;
    const updatedContact = await Contact.findOneAndUpdate({
      _id: req.params.id,
      owner: user.id
    }, req.body, { new: true });

    if (updatedContact) {
      res.status(200).json({
        success: true,
        message: 'Success',
        contact: updatedContact
      });
    }
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An error has occurred',
        error: `${error.message}`,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'An error has occurred',
      error: `${error}`,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { user } = req.decoded;
    const contact = await Contact.findOneAndRemove({
      _id: req.params.id,
      owner: user.id
    });

    if (contact) {
      res.status(204).json({
        success: true,
        message: 'Record successfully deleted',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error has occurred',
      error: `${error}`,
    });
  }
};
