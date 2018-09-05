const BlogData = require('../../../data/content.json');

class BlogController {

	static async getList(req, res) {
		const pagination = {
			limit: Math.abs(req.query.limit) || 3,
			skip: Math.abs(req.query.skip) || 0
		};
		
		try {
				let total = BlogData.length

				res.json(Object.assign(pagination, {
					total,
					data: BlogData
				}));
			} catch (e) {
				console.error(e.message);
			}
		}
  
  static async create(req, res) {
		// TODO: Write your implementation here
		// Use the users.json file to populate the database

		const user = new UserModel(req.body);
		const validateError = user.validateSync();

		if (validateError) {
			return res.status(422).send(validateError.message);
		}

		try {
			await user.save();
			res.sendStatus(201);
		} catch (e) {
			console.log(e.message);
			res.send(400).send(e.message);
		}
	}
}

module.exports = BlogController;
