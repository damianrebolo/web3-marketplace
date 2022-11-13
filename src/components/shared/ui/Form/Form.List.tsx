interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const FormList: React.FC<Props> = ({ ...props }) => (
  <div className="grid grid-cols-4 content-center items-stretch w-full max-w-sm gap-3" {...props} />
);
