import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
	const { imageUrl, title, address, description } = props.meetupData;
	return (
		<>
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
	return {
		fallback: false,
		paths: [
			{
				params: {
					meetupId: "m1",
				},
			},
			{
				params: {
					meetupId: "m2",
				},
			},
			{
				params: {
					meetupId: "m3",
				},
			},
			{
				params: {
					meetupId: "m4",
				},
			},
		],
	};
}

export async function getStaticProps(context) {
	//fetch api
	const meetupId = context.params.meetupId;
	return {
		props: {
			meetupData: {
				id: meetupId,
				imageUrl: "https://picsum.photos/200/300",
				title: "A first meetup",
				address: "Some street, 1234",
				description: "Meetup description",
			},
		},
	};
}

export default MeetupDetails;
