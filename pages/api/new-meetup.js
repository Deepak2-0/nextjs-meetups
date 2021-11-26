const { MongoClient } = require("mongodb");
const uri =
	"mongodb+srv://Deepak:<password>@cluster0.z3i7n.mongodb.net/meetups?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect((err) => {
	const collection = client.db("test").collection("meetups");
	// perform actions on the collection object
	client.close();
});

//   /api/new-meetup
// POST  /api/new-meetup
async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;

		const { title, image, address, description } = data;

		const client = await MongoClient.connect(uri);
	}
}

export default handler;
