import { MongoClient } from "mongodb";

//   /api/new-meetup
// POST  /api/new-meetup
async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;

		const { title, image, address, description } = data;

		const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.z3i7n.mongodb.net/meetups?retryWrites=true&w=majority`;

		const client = new MongoClient(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		try {
			await client.connect();
			const meetupCollection = client.db().collection("meetups");

			const result = await meetupCollection.insertOne(data);

			res.status(201).json({ message: "Meetup inserted" });
		} catch (error) {
			console.log(error);
		} finally {
			await client.close();
		}
	}
}

export default handler;
