const Dumbbell = require('../models/Dumbbell');

exports.getAll = (page, sort, search) => Dumbbell.find({ ...search })
                                .sort({ currentPrice: sort })
                                .skip(page * 6)
                                .limit(6)
                                .populate({
                                    path: 'comments',
                                    model: 'Comment'
                                });

exports.getById = (dumbbellId) => Dumbbell.findById(dumbbellId)
                                            .populate({
                                                path: 'comments',
                                                model: 'Comment'
                                            });

exports.create = (dumbbellData) => Dumbbell.create(dumbbellData);

exports.edit = (dumbbellId, dumbbellData) => Dumbbell.findByIdAndUpdate(dumbbellId, dumbbellData);

exports.deleteDumbbell = (dumbbellId) => Dumbbell.findByIdAndDelete(dumbbellId);

exports.count = () => Dumbbell.countDocuments({});

exports.getBrands = (search) => Dumbbell.find({ ...search }).select('brand').distinct('brand');