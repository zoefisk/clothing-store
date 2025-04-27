import { useEffect, useState } from "react";
import { Review } from "@/models/Review";
import {didUserWriteReview, getUserByUserId} from "@/utils/auth";
import P from "@/components/typography/P";
import H3 from "@/components/typography/H3";
import {Button, Paper, Rating} from "@mantine/core";

export default function ReviewList({ review }: { review: Review }) {

    const [userWroteReview, setUserWroteReview] = useState<boolean | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        if (review.id !== undefined) {
            didUserWriteReview(review.id).then((result) => {
                if (isMounted) {
                    setUserWroteReview(result);
                }
            });
        }

        return () => {
            isMounted = false;
        };
    }, [review.id]);

    useEffect(() => {
        let isMounted = true;

        if (review.userId !== undefined) {
            getUserByUserId(review.userId.toString()).then((user) => {
                if (isMounted && user) {
                    setUserName(`${user.firstName} ${user.lastName}`);
                }
            });
        }

        return () => {
            isMounted = false;
        };
    }, [review.userId]);

    if (userWroteReview === null) {
        return <div>Loading...</div>;
    }

    return (
        <Paper shadow="sm" radius="md" p="md" withBorder style={{position: "relative"}}>
            <div style={{position: "absolute", display: "flex", top: "10px", right: "10px", gap: "10px"}}>
                {review.rating}
                <Rating value={review.rating}/>
            </div>
            <H3>{userName}</H3>
            <P>{review.createdAt ? new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
            }).format(new Date(review.createdAt)) : "Invalid date"}</P>
            <div style={{ marginRight: "15%", marginTop: "10px"}}>
                <P>{review.content}</P>
            </div>
            {userWroteReview && (
                <Button style={{ position: "absolute", bottom: "10px", top: "auto", right: "10px" }}>
                    Edit
                </Button>
            )}
        </Paper>
    );
}