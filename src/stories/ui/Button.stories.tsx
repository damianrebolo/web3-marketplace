import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "../../components/shared/ui/Button";

export default {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      description: "One or more button variant combinations",
      options: ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light", "link"],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "lg"],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>;

export const Default = Template.bind({});
Default.args = {
  variant: "primary",
  size: "lg",
};
