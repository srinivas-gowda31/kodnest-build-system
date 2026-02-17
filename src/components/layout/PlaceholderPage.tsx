interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-space-3 py-space-5">
      <h1 className="text-center">{title}</h1>
      <p className="mt-space-2 text-center text-sm text-muted-foreground">
        This section will be built in the next step.
      </p>
    </div>
  );
};

export default PlaceholderPage;
