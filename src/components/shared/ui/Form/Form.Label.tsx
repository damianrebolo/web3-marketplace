interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const FormLabel: React.FC<Props> = ({ ...props }) => (
  <div className="text-lg font-semibold text-gray-700 dark:text-white my-3" {...props} />
);
