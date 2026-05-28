import { Html, Head, Body, Container, Section, Text, Tailwind, Img, Heading } from "react-email";
import * as React from "react";
export default function ClientEmail({ email, query }) {
  email = "santino";
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="m-0">
          <Section className="mx-auto mt-6 bg-white text-center">
            <Img
              alt="Nagare logo"
              src="https://www.nagarestudio.site/_image?href=%2F_astro%2FHeader.uSVS_iOD.svg&w=141&h=38&f=svg"
              className="mx-auto w-42"
            />
            <Text className="font-system text-2xl font-bold">
              Hola {email}! Gracias por su consulta.
            </Text>
          </Section>
          <Section className="bg-gray-200">
            <Text className="font-system mx-auto py-6 text-center text-lg">
              Hemos recibido su consulta: <br />
              <span className="font-bold">{query}</span>
            </Text>
          </Section>
          <Section className="bg-gray-200">
            <Text className="font-system mx-auto py-6 text-center text-lg">
              Nos pondremos en contacto con usted lo antes posible.
            </Text>
          </Section>
          <Section>
            <Text className="font-system mx-auto py-6 text-center text-lg">
              Saludos cordiales, <br />
              El equipo de Nagare Studio
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}
