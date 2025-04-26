import H1 from "@/components/typography/H1";
import P from "@/components/typography/P";
import {Input, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";

// this will get called after a new user is created -- not exactly sure where this will show up but yea.
// maybe it could replace the home page temporarily.

export default function NewUserIntroduction() {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            firstName: '',
            lastName: '',
            favoriteStyles: [],
        },
    })

    return (
        <>
            <H1>Welcome to Clothing for You!</H1>
            <P>Let's hear a little more about you.</P>

            <P>First Name</P>
            <TextInput placeholder="First Name" />
            <P>Last Name</P>
            <TextInput placeholder="Last Name" />
            <P>Pick your Top 3 Styles (optional)</P>
            {/* TODO: Select Chips using the styles from constants.ts */}
        </>
    )
}