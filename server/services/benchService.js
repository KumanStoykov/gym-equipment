const Bench = require('../models/Bench');


exports.getAll = (page, sort, search) => Bench.find({ ...search })
                                .sort({ currentPrice: sort })
                                .skip(page * 6)
                                .limit(6)
                                .populate({
                                    path: 'comments',
                                    model: 'Comment'
                                });

exports.getById = (benchId) => Bench.findById(benchId)
                                            .populate({
                                                path: 'comments',
                                                model: 'Comment'
                                            });

exports.create = (benchData) => Bench.create(benchData);

exports.edit = (benchId, benchData) => Bench.findByIdAndUpdate(benchId, benchData);

exports.deleteBench = (benchId) => Bench.findByIdAndDelete(benchId);

exports.count = () => Bench.countDocuments({});

exports.getBrands = (search) => Bench.find({ ...search }).select('brand').distinct('brand');