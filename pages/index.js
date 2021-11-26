//CLient side data loading

// import { useEffect, useState } from "react";

// import MeetupList from "../components/meetups/MeetupList";

// const HomePage = () => {
// 	const [meetupData, setMeetupData] = useState([]);

// 	useEffect(() => {
// 		setMeetupData(MEETUPS);
// 	}, []);
// 	return <MeetupList meetups={meetupData} />;
// };

// export default HomePage;

//statically generated page with data

import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
	return (
		<>
			<Head>
				<title>Meetups</title>
				<meta
					name="description"
					content="List to show all the react meetups!"
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
};

//FOR STATIC SITE GENERATION
export async function getStaticProps() {
	//fetch data from an API

	const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.z3i7n.mongodb.net/meetups?retryWrites=true&w=majority`;

	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	let meetups = [];

	try {
		await client.connect();
		const meetupCollection = client.db().collection("meetups");

		meetups = await meetupCollection.find().toArray();
	} catch (error) {
		console.log(error);
	} finally {
		await client.close();
	}

	//the reason we are destructing as _id of mongodb we dont want to pass as it is, otherwise will give error
	const MEETUPS = meetups.map((meetup) => ({
		id: meetup._id.toString(),
		title: meetup.title,
		image: meetup.image,
		address: meetup.address,
		description: meetup.description,
	}));

	return {
		props: {
			meetups: MEETUPS || [],
		},
		revalidate: 1000,
	};
}

//FOR SERVER SIDE RENDERING
// export async function getServerSideProps(context) {

// 	const req = context.req;
// 	const res= context.res;
// 	//fetch data
// 	return {
// 		props: {
// 			meetups: MEETUPS,
// 		},
// 	};
// }

export default HomePage;

// const MEETUPS = [
// 	{
// 		id: "m1",
// 		image: "https://picsum.photos/200/300",
// 		title: "1st Image",
// 		address: "Addess 1",
// 		description: "Description of first Image",
// 	},
// 	{
// 		id: "m2",
// 		image: "https://picsum.photos/200/300",
// 		title: "2st Image",
// 		address: "Addess 2",
// 		description: "Description of second Image",
// 	},
// 	{
// 		id: "m3",
// 		image: "https://picsum.photos/200/300",
// 		title: "3st Image",
// 		address: "Addess 3",
// 		description: "Description of third Image",
// 	},
// 	{
// 		id: "m4",
// 		image: "https://picsum.photos/200/300",
// 		title: "4st Image",
// 		address: "Addess 4",
// 		description: "Description of fourth Image",
// 	},
// ];
