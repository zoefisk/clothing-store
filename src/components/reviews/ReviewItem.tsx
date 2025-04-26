import { useEffect, useState } from "react";
import { Review } from "@/models/Review";
import {didUserWriteReview, getUserByUserId} from "@/utils/auth";
import P from "@/components/typography/P";
import H3 from "@/components/typography/H3";

export default function ReviewList({ review }: { review: Review }) {

    console.log("start of the function -- review: ", review);
    console.log("start of the function -- review.userId: ", review.userId);

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

    if (userWroteReview) {
        return (
            <div>
                <H3>{userName} Hey</H3>
                <P>{review.content}</P>
                <P>{review.createdAt ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(review.createdAt)) : "Invalid date"}</P>
                <P>{review.rating}/5</P>
                <P>Edit</P>
            </div>
        );
    } else {
        return (
            <div>
                <H3>{userName} Hey</H3>
                <P>{review.content}</P>
                <P>{review.createdAt ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(review.createdAt)) : "Invalid date"}</P>
                <P>{review.rating}/5</P>
            </div>
        );
    }
}