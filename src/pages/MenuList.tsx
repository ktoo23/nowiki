import { useEffect, useMemo, useState } from "react";

import { menu_items } from "../assets/data/menu.json";
import { menu_categories } from "../assets/data/category.json";
import { MenuCategory } from "../types/category.interface";
import Header from "@/components/menu-list/Header";
import Sidebar from "@/components/menu-list/Sidebar";
import TasteFilter from "@/components/menu-list/TasteFilter";
import FilteredMenuList from "@/components/menu-list/FilteredMenuList";
import VoiceBtn from "@/components/voice/VoiceBtn";
import CartButton from "@/components/CartButton";
import GuidePopup from "@/components/GuidePopup";
import useGuidePopupStore from "@/store/useGuidePopupStore";

const defaultCategoryId = menu_categories[0].id;

const MenuList = () => {
  const [filters, setFilters] = useState({
    categoryId: defaultCategoryId,
    tasteId: "",
  });

  const [messages, setMessages] = useState<string[]>([]);

  const { isGuideActive } = useGuidePopupStore((state) => state);

  useEffect(() => {
    if (isGuideActive) {
      setMessages([
        "안녕! 내 이름은 위키야! ! \n 아래 화살표를 눌러줄래?",
        "음성으로도 주문할 수 있어! \n필요하면 오른쪽 상단의 음성 주문하기 버튼을 눌러봐~",
      ]);
    }
  }, [isGuideActive]);

  const filteredList = useMemo(() => {
    return menu_items.filter((item) => {
      const matchesCategory = item.category_id === filters.categoryId;
      const matchesTaste =
        filters.tasteId === "" || item.taste_ids.includes(filters.tasteId);
      return matchesCategory && matchesTaste;
    });
  }, [filters, menu_items]);

  const menuCategory = menu_categories.find(
    (menu) => menu.id === filters.categoryId,
  );

  const handleUpdateMessages = (newMessages: string[]) => {
    setMessages(newMessages);
  };

  const handleCategory = (category: MenuCategory) => {
    setFilters((prev) => ({
      ...prev,
      categoryId: category.id,
      tasteId: "",
    }));
  };

  const handleTaste = (tasteId: string) => {
    setFilters((prev) => ({
      ...prev,
      tasteId,
    }));
  };

  if (!menuCategory) return null;

  return (
    <div>
      <div className="max-w-screen-sm relative sm:m-auto text-mc_black ">
        <div className="flex">
          <div className="w-[120px] sm:w-[150px]">
            <img src="/image/wiki.png" alt="로고 이미지" />
          </div>
          <Header
            name={
              menuCategory.name as
                | "버거"
                | "사이드"
                | "치킨"
                | "음료"
                | "디저트"
            }
            description={menuCategory?.description}
          />
          <div className="flex gap-2">
            <VoiceBtn />
            <CartButton />
          </div>
        </div>
        <div className="flex">
          <Sidebar
            categories={menu_categories}
            onCategoryChange={handleCategory}
            onUpdateMessages={handleUpdateMessages}
            filters={filters}
          />
          <div className="grow pt-5">
            {menuCategory?.name === "버거" && (
              <TasteFilter filters={filters} onTasteChange={handleTaste} />
            )}
            <FilteredMenuList items={filteredList} />
            <GuidePopup messages={messages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
