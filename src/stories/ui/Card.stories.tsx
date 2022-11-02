import { ComponentStory, ComponentMeta } from "@storybook/react";
import Image from "next/image";

import Card from "../../components/shared/ui/Card";

export default {
  title: "UI/Card",
  component: Card,
  argTypes: {
    bg: {
      options: ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light"],
      control: { type: "select" },
    },
    border: {
      options: ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light"],
      control: { type: "select" },
    },
    text: {
      options: ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light", "white", "muted"],
      control: { type: "select" },
    },
    rounded: {
      options: ["sm", "lg"],
      control: { type: "select" },
    },
    shadow: {
      options: ["sm", "lg"],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>
    <Card.Image>
      <Image src="https://picsum.photos/id/188/720/400" alt="Picture of the author" layout="fill" className="object-cover object-center" />
    </Card.Image>
    <Card.Body>
      Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
      de las industrias desde el año 1500, cuando un impresor
    </Card.Body>
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  bg: null,
  border: null,
  text: "secondary",
  rounded: "lg",
  shadow: "lg",
};
