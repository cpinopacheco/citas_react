export const Error = ({ mensaje }) => {
  return (
    <div className="bg-red-500 text-white text-center uppercase font-bold rounded-lg p-2 mb-4">
      <p>{mensaje}</p>
    </div>
  );
};
