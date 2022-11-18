import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Layout } from "../../components/shared/core";
import ToastContainer from "../../components/shared/core/Toaster/Toaster";
import ToastProvider, { useToast } from "../../components/shared/core/Toaster/ToasterProvider";
import { Button } from "../../components/shared/ui/Button";

const PushToaster = () => {
  const toast = useToast();

  return (
    <Button
      onClick={() => {
        toast?.pushWarning("This is a new toaster");
      }}
    >
      Push
    </Button>
  );
};

export default {
  title: "UI/Toaster",
  component: ToastProvider,
  argTypes: {
    variant: {
      options: ["top_left", "top_right", "bottom_right", "bottom_left", "top_middle", "bottom_middle"],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof ToastProvider>;

const Template: ComponentStory<typeof ToastProvider> = (args) => (
  <ToastProvider {...args}>
    <div className="flex justify-center items-center w-full h-screen">
      <PushToaster />
    </div>
  </ToastProvider>
);

export const Default = Template.bind({});
Default.args = {
  variant: "top_left",
};
