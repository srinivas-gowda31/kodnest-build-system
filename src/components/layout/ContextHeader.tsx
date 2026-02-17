interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader = ({ headline, subtext }: ContextHeaderProps) => {
  return (
    <section className="border-b border-border px-space-3 py-space-4">
      <h1 className="text-foreground">{headline}</h1>
      <p className="mt-space-1 text-base text-muted-foreground">{subtext}</p>
    </section>
  );
};

export default ContextHeader;
