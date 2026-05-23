import { Html, Head, Body, Container, Section, Text, Tailwind, Img } from "react-email";

export function ClientEmail({ email, query }) {
  return (
    <Html>
      <Tailwind>
        <Body>
          <Header>
            <Text className="mb-4 text-2xl font-bold">New Contact Query</Text>
            <Img alt="Nagare logo" src="" />
          </Header>
        </Body>
      </Tailwind>
    </Html>
  );
}
