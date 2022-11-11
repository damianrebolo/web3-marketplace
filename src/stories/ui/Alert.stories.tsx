import { ComponentStory, ComponentMeta } from "@storybook/react";

import Alert from "../../components/shared/ui/Alert";
import { Button } from "../../components/shared/ui/Button";
import { InfoIcon } from "../../components/shared/icons";

export default {
  title: "UI/Alert",
  component: Alert,
  argTypes: {
    variant: {
      options: ["primary", "secondary", "success", "danger", "warning", "info", "light"],
      control: { type: "select" },
    },
    show: {
      options: [true, false],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => (
  <Alert {...args}>
    <Alert.Heading>Network mismatch!</Alert.Heading>
    <Alert.Body>Your wallet is connected to the wrong network, please connect it to Goerli!</Alert.Body>
    <Alert.Actions>
      <Button variant="secondary" size="sm">
        Dismiss
      </Button>
    </Alert.Actions>
  </Alert>
);

export const Default = Template.bind({});
Default.args = {
  variant: "warning",
  show: true,
};
