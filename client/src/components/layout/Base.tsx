const Base = ({
  header,
  children,
}: {
  header?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {header && header}
      <div className="flex items-center justify-center flex-1">{children}</div>
    </div>
  );
};

export default Base;
