const Treadmill = require('../models/Treadmill');

exports.getAll = (page, sort) => Treadmill.find({})
                                .sort({ createdAt: sort })
                                .skip(page * 6)
                                .limit(6)
                                .populate({
                                    path: 'comments',
                                    model: 'Comment'
                                });

exports.getById = (treadmillId) => Treadmill.findById(treadmillId)
                                            .populate({
                                                path: 'comments',
                                                model: 'Comment'
                                            });

exports.create = (treadmillData) => Treadmill.create(treadmillData);

exports.deleteTreadmill = (treadmillId) => Treadmill.findByIdAndDelete(treadmillId);

exports.count = () => Treadmill.countDocuments({});