import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
	const { imageUrl, title, address, description } = props.meetupData;
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
			</Head>
			<MeetupDetail
				imageUrl={imageUrl}
				title={title}
				address={address}
				description={description}
			/>
		</>
	);
};

//To get all the paths as we are using getStaticProps
//fallback false, means you have mentioned all the paths present, so user goes to "m5", he/she
//will get 404 error

//if fallback is true, means for a new paths which is not present nextjs will dynamically
//generate the page on incoming request to server
export async function getStaticPaths() {
	const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.z3i7n.mongodb.net/meetups?retryWrites=true&w=majority`;

	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	let meetups = [];

	try {
		await client.connect();
		const meetupCollection = client.db().collection("meetups");

		//means only includes _id and no other field values
		meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
	} catch (error) {
		console.log(error);
	} finally {
		await client.close();
	}

	return {
		fallback: "blocking",
		paths: meetups.map((meetup) => ({
			params: {
				meetupId: meetup._id.toString(),
			},
		})),
	};
}

export async function getStaticProps(context) {
	//fetch api
	const meetupId = context.params.meetupId;

	const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.z3i7n.mongodb.net/meetups?retryWrites=true&w=majority`;

	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	let selectedMeetup = {};

	try {
		await client.connect();
		const meetupCollection = client.db().collection("meetups");

		//means only includes _id and no other field values
		selectedMeetup = await meetupCollection.findOne({
			_id: ObjectId(meetupId),
		});
	} catch (error) {
		console.log(error);
	} finally {
		await client.close();
	}

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				imageUrl: selectedMeetup.image,
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				description: selectedMeetup.description,
			},
		},
	};
}

export default MeetupDetails;
