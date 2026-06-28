import Base from "@/components/layout/Base";
import Header from "@/components/layout/Header";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return <Base header={<Header />}>{children}</Base>;
};

export default PublicLayout;
