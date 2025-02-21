import { cn } from "../utils/classname";
import Layout from "../component/layouts/Layout";

type Props = {
  className?: string;
};

const SignupPage: React.FC<Props> = ({ className }) => {
  return (
    <Layout className={cn("", className)}>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">회원가입</h1>
        <SignupForm />
      </div>
    </Layout>
  );
};

export default SignupPage;
