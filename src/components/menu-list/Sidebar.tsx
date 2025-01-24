import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { MenuCategory } from "@/types/category.interface";
import React, { useEffect, useRef } from "react";
import useGuidePopupStore from "@/store/useGuidePopupStore";

type Props = {
  categories: MenuCategory[];
  onCategoryChange: (category: MenuCategory) => void;
  onUpdateMessages: (messages: string[]) => void;
  filters: {
    categoryId: string;
    tasteId: string;
  };
};

const Sidebar = ({
  categories,
  onCategoryChange,
  onUpdateMessages,
  filters,
}: Props) => {
  const { isGuideActive } = useGuidePopupStore((state) => state);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showMessage = (value: string) => {
    let message = "";
    switch (value) {
      case "버거":
        message = `햄버거를 선택했구나!\n 햄버거는 맛별로 나눠져있으니, 원하는 맛을 골라!`;
        break;
      case "치킨":
        message = "메뉴에 스파이시가 들어가면 매콤할 수도 있으니 조심!";
        break;
      case "사이드":
        message =
          "햄버거만 먹으면 출출하다구. . \n오, 해시브라운도 있네! 다진 감자 튀김이라고 생각하면 돼~";
    }
    onUpdateMessages([message]);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onUpdateMessages([
        "화면에 손가락을 대고 위, 아래로 움직여봐. \n 숨어있던 메뉴들이 보이네!",
      ]);
    }, 4000);
  };

  const activateCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    const categoryToGive = categories.find(
      (category) => category.name === value,
    ) as MenuCategory;

    if (isGuideActive) showMessage(value);

    onCategoryChange(categoryToGive);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="pt-[10px] mr-2 sm:mr-4 px-2 h-full border-[1px] border-solid border-[#E3E3E3] rounded-[6px]">
      <h2 className="mb-5 font-bold text-2xl">메뉴</h2>
      {categories.map((category) => (
        <div
          key={category.id}
          className={`rounded-[10px] ${
            filters.categoryId === category.id ? "bg-mc_yellow" : "bg-[#F8F8F8]"
          }`}
        >
          <Button
            value={category.name}
            className={cn(
              "mb-3 size-[100px] p-2 sm:size-[150px] flex flex-col justify-between items-center rounded-[10px] hover:bg-mc_yellow active:bg-mc_yellow",
              filters.categoryId === category.id
                ? "bg-mc_yellow"
                : "bg-[#F8F8F8]",
            )}
            onClick={activateCategory}
          >
            <div className="mb-1 rounded-[10px] overflow-hidden">
              <img
                src={category.image_url}
                alt=""
                className="block size-full"
              />
            </div>
            <p className="text-black sm:text-lg">{category.name}</p>
          </Button>
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
