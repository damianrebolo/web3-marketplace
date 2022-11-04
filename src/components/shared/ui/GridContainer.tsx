interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const GridContainer: React.FC<Props> = ({ ...props }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 py-10" {...props} />
);
