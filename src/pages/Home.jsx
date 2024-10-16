import { Flex, Text, Button } from "@radix-ui/themes";
function Home() {
    return (
		<Flex direction="column" gap="2">
			<Text>Adarsh&apos;s Portfolio</Text>
			<Button onClick={() => console.log('Button clicked!')}>
                Lets go
            </Button>
		</Flex>
    )
}

export default Home