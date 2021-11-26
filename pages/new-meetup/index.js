import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetUp = () => {
	const router = useRouter();

	const onAddMeetup = async (meetupData) => {
		const response = await axios.post("/api/new-meetup", meetupData);
		router.push("/");
	};
	return (
		<>
			<Head>
				<title>Add a New Meetups</title>
				<meta
					name="description"
					content="Add your own meetups and create amazing networking oppurtunities"
				/>
			</Head>
			<NewMeetupForm onAddMeetup={onAddMeetup} />
		</>
	);
};

export default NewMeetUp;
