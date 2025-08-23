import NavigationHeader from "../components/NavigationHeader";

const WorkerDetailsPage: React.FC = () => {
  return (
    <div className="flex h-screen flex-col overflow-x-hidden bg-white">
      <NavigationHeader
        title=""
        className="px-6 py-4 font-bold"
        backTo="/commute-range"
      />

      <div className="mt-4 text-2xl font-bold text-gray-900">
        원하시는 업무를 체크해주세요
      </div>
    </div>
  );
};

export default WorkerDetailsPage;
