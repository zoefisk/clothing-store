import {Textarea, Title} from "@mantine/core";
import P from "@/components/typography/P";
import {Review} from "@/models/Review";
import ReviewItem from "@/components/reviews/ReviewItem";

export default function ReviewList({ reviews }: { reviews: Review[] }) {

    if (!reviews || reviews.length === 0) {
        return (
            <div>
                <Title order={3} mt="xl" mb="md">Reviews and Comments</Title>
                <P>No reviews yet. Be the first to leave a comment!</P>
            </div>
        );
    }
    else {
        return (
            <div>
                <Title order={3} mt="xl" mb="md">Reviews and Comments</Title>
                {reviews.map((review: Review) => (
                    <ReviewItem key={review.id} review={review}/>
                ))}
            </div>
        );
    }
}