interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertHeading: React.FC<Props> = ({ children }) => (
  <div className="flex items-center">
    <svg
      aria-hidden="true"
      className="w-5 h-5 mr-2"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      ></path>
    </svg>
    <h3 className="text-lg font-medium">{children}</h3>
  </div>
);
