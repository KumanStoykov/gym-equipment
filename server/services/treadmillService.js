const Treadmill = require('../models/Treadmill');

exports.getAll = (page, sort, search) => Treadmill.find({...search})
                                .sort({ currentPrice: sort })
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

exports.edit = (treadmillId, treadmillData) => Treadmill.findByIdAndUpdate(treadmillId, treadmillData);

exports.deleteTreadmill = (treadmillId) => Treadmill.findByIdAndDelete(treadmillId);

exports.count = (search) => Treadmill.countDocuments({ ...search});

exports.getBrands = (search) => Treadmill.find({ ...search }).select('brand').distinct('brand');
