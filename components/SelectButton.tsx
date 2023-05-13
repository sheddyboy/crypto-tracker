interface SelectButtonProps {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export default function SelectButton({
  children,
  onClick,
  selected,
}: SelectButtonProps) {
  return (
    <button
      className={` hover:bg-[gold] hover:text-[black] border-[gold] w-[22%] border rounded-[5px] p-[10px] px-[20px] font-montserrat ${
        selected
          ? "bg-[gold] text-[black] font-bold"
          : "bg-inherit text-inherit font-medium"
      }`}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}
