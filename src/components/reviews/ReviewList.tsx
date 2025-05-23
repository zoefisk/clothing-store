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
        const visibleReviews = reviews.slice(0, 3); // TODO: Implement "View More" functionality

        return (
            <div>
                <Title order={3} mt="xl" mb="md">Reviews and Comments</Title>
                {visibleReviews.map((review: Review) => (
                    <div key={review.id} style={{ marginBottom: '1rem' }}>
                        <ReviewItem review={review} />
                    </div>
                ))}
                {reviews.length > 3 && (
                    <button style={{ marginTop: '1rem' }}>see more comments...</button>
                )}
            </div>
        );
    }
}