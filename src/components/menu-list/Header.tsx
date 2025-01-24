import { getCategoryIcon } from "@/utils/category";

type Props = {
  name: '버거' | '치킨' | '사이드' | '음료' | '디저트';
  description: string;
}

const Header = ({ name, description }: Props) => {
  return (
    <header className="grow pt-5 pl-8 text-left">
    <div className="h-[70px] flex items-center">
      <p className="font-bold text-[30px]">{name}</p>
      <p className="relative top-[-4px] text-[40px]">{getCategoryIcon(name)}</p>
    </div>
    <p className="text-[#808080]">{description}</p>
  </header>
  )
};

export default Header;