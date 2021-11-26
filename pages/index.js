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

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
	return <MeetupList meetups={props.meetups} />;
};

export async function getStaticProps() {
	//fetch data from an API

	return {
		props: {
			meetups: MEETUPS,
		},
	};
}

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

const MEETUPS = [
	{
		id: "m1",
		image: "https://picsum.photos/200/300",
		title: "1st Image",
		address: "Addess 1",
		description: "Description of first Image",
	},
	{
		id: "m2",
		image: "https://picsum.photos/200/300",
		title: "2st Image",
		address: "Addess 2",
		description: "Description of second Image",
	},
	{
		id: "m3",
		image: "https://picsum.photos/200/300",
		title: "3st Image",
		address: "Addess 3",
		description: "Description of third Image",
	},
	{
		id: "m4",
		image: "https://picsum.photos/200/300",
		title: "4st Image",
		address: "Addess 4",
		description: "Description of fourth Image",
	},
];
