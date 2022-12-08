const Rack = require('../models/Rack');

exports.getAll = (page, sort) => Rack.find({})
                                .sort({ createdAt: sort })
                                .skip(page * 9)
                                .limit(9)
                                .populate({
                                    path: 'comments',
                                    model: 'Comment'
                                });

exports.getById = (rackId) => Rack.findById(rackId);

exports.create = (rackData) => Rack.create(rackData);

exports.deleteRack = (rackId) => Rack.findByIdAndDelete(rackId);

exports.count = () => Rack.countDocuments({});