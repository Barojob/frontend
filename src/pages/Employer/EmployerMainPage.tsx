import { MdImage } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SearchBoard from "../../components/Board/SearchBoard";
import Header from "../../components/layouts/Header";

type Props = {
  className?: string;
};

const EmployerMainPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-main-1 flex h-full w-full flex-col">
      <Header />
      <main className="flex-1 overflow-scroll">
        <div className="flex flex-col gap-7">
          <div className="flex h-36 items-center justify-center bg-gray-300">
            <MdImage className="text-xl text-gray-400" />
          </div>
          <div className="flex flex-col gap-7 px-6">
            <SearchBoard
              title="근로자 요청하기"
              time="3시간"
              onClick={() => {
                navigate("/employer/job-posting");
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerMainPage;
