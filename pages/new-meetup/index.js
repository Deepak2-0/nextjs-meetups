import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetUp = () => {
	const onAddMeetup = (meetupData) => {
		console.log(meetupData);
	};
	return (
		<>
			<NewMeetupForm onAddMeetup={onAddMeetup} />
		</>
	);
};

export default NewMeetUp;
