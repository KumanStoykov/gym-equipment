const Bike = require('../models/Bike');

exports.getAll = (page, sort, search) => Bike.find({ ...search })
                                .sort({ currentPrice: sort })
                                .skip(page * 6)
                                .limit(6)
                                .populate({
                                    path: 'comments',
                                    model: 'Comment'
                                });

exports.getById = (bikeId) => Bike.findById(bikeId)
                                            .populate({
                                                path: 'comments',
                                                model: 'Comment'
                                            });

exports.create = (bikeData) => Bike.create(bikeData);

exports.edit = (bikeId, bikeData) => Bike.findByIdAndUpdate(bikeId, bikeData);

exports.deleteBike = (bikeId) => Bike.findByIdAndDelete(bikeId);

exports.count = () => Bike.countDocuments({});

exports.getBrands = (search) => Bike.find({ ...search }).select('brand').distinct('brand');
