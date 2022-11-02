import { ComponentStory, ComponentMeta } from "@storybook/react";

import CardsPage from "../../pages/designs/cards";

export default {
  title: "Pages/Designs",
  component: CardsPage,
} as ComponentMeta<typeof CardsPage>;

export const Template: ComponentStory<typeof CardsPage> = () => <CardsPage />;
