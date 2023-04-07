const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,NotFoundError} = require('../errors');


const getAllJobs = async (req, res) => {
	
	const jobs = await Job.find({createdBy: req.user.userId}).sort({createdAt: -1});

	res.status(StatusCodes.OK).json({
		jobs,
		count: jobs.length,
	});
};


const getSingleJob = async (req, res) => {
	
	const job = await Job.findOne({createdBy: req.user.userId, _id: req.params.id});

	if (!job) {
		throw new NotFoundError(`Job with id ${req.params.id} not found`);
	}

	res.status(StatusCodes.OK).json({
		job,
	});
};

const createJob = async (req, res) => {

	req.body.createdBy = req.user.userId;

	const job = await Job.create(req.body);

	res.status(StatusCodes.CREATED).json({
		job,
	});
};

const updateJob = async (req, res) => {

	const {company,position} = req.body;

	if (!company || !position) {
		throw new BadRequestError('Please provide company and position');
	}


	const job = await Job.findOneAndUpdate(
		{createdBy: req.user.userId, _id: req.params.id},
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!job) {
		throw new NotFoundError(`Job with id ${req.params.id} not found`);
	}

	res.status(StatusCodes.OK).json({
		job,
	});
};

const deleteJob = async (req, res) => {
	
	const job = await Job.findOneAndDelete({createdBy: req.user.userId, _id: req.params.id});

	if (!job) {
		throw new NotFoundError(`Job with id ${req.params.id} not found`);
	}

	res.status(StatusCodes.OK).json({
		job:null,
	});
};

module.exports = {
	getAllJobs,
	getSingleJob,
	createJob,
	updateJob,
	deleteJob,
};
