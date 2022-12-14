const Rack = require('../models/Rack');

exports.getAll = (page, sort, search) => Rack.find({ ...search })
                                .sort({ currentPrice: sort })
                                .skip(page * 6)
                                .limit(6)
                                .populate({
                                    path: 'comments',
                                    model: 'Comment'
                                });

exports.getById = (rackId) => Rack.findById(rackId)
                                            .populate({
                                                path: 'comments',
                                                model: 'Comment'
                                            });

exports.create = (rackData) => Rack.create(rackData);

exports.edit = (rackId, rackData) => Rack.findByIdAndUpdate(rackId, rackData);

exports.deleteRack = (rackId) => Rack.findByIdAndDelete(rackId);

exports.count = () => Rack.countDocuments({});

exports.getBrands = (search) => Rack.find({ ...search }).select('brand').distinct('brand');
