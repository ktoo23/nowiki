import { useState, useEffect, useCallback, useMemo } from "react";
import useSpeechToText from "../../hooks/useSpeechToText";
import MicImage from "../../assets/image/mic.png";
import Fuse from "fuse.js";
import menuData from "../../assets/data/menu.json";
import { MenuItem } from "@/types/menu.interface";
import VoiceSearchedMenuList from "./VoiceSearchedMenuList";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { setItemToOrderInfo } from "@/feat/order";
import { josa } from "es-hangul";

interface FuzeItem {
    item: MenuItem;
    refIndex?: number;
}

const recommendedMenu = [
    {
        item: menuData.menu_items[0],
        refIndex: 0
    },
    {
        item: menuData.menu_items[4],
        refIndex: 4
    },
    {
        item: menuData.menu_items[7],
        refIndex: 7
    },
    {
        item: menuData.menu_items[8],
        refIndex: 8
    }
];

const Voice = () => {
    const { transcript, listening, toggleListening } = useSpeechToText();
    const [searchResults, setSearchResults] = useState<FuzeItem[]>([]);
    const [selectedMenuItems, setSelectedMenuItems] = useState<MenuItem[]>([]);
    const navigate = useNavigate();
    const [searchComplete, setSearchComplete] = useState<boolean>(false);

    const onClickVoiceButton = () => {
        toggleListening();
        setSearchResults([]);
        setSelectedMenuItems([]);
        setSearchComplete(false);
    };

    const menuFuse = useMemo(
        () =>
            new Fuse(menuData.menu_items, {
                keys: ["name", "description"]
            }),
        []
    );

    useEffect(() => {
        if (transcript && !listening && !searchComplete) {
            const menuItemResults = menuFuse.search(transcript);
            setSearchComplete(true);
            setSearchResults(menuItemResults);
        }
    }, [transcript, listening, searchComplete, menuFuse]);

    const handleMenuItemClick = useCallback((item: MenuItem) => {
        setSelectedMenuItems((prevItems) => {
            const isItemSelected = prevItems.some(
                (selectedItem) => selectedItem.id === item.id
            );
            if (isItemSelected) {
                return prevItems.filter(
                    (selectedItem) => selectedItem.id !== item.id
                );
            } else {
                return [...prevItems, item];
            }
        });
    }, []);

    const handleAddShoppingCart = () => {
        selectedMenuItems.forEach((item) => setItemToOrderInfo(item));
        alert("장바구니에 추가되었습니다.");
    };

    const handleQuickOrder = () => {
        if(selectedMenuItems.length !== 0){
					selectedMenuItems.forEach((item) => setItemToOrderInfo(item));
        navigate("/order-history");
				}
				else {
					alert("메뉴를 선택해주세요.")
					return
				}
    };

    const getSeachText = (str: string) => {
        return (
					<>
						<strong className="font-bold">{str}</strong>
						{josa(str, "으로/로").slice(str.length)}
					</>
					)
    };

    return (
        <div className="flex flex-col items-center p-8 max-w-[600px] mx-auto my-0 pb-40 relative">
            <h1 className="mb-4 font-semibold">말해서 메뉴 찾기</h1>
            <p className="text-center mb-8">
                마이크 버튼을 클릭하고 검색하려는 메뉴의 이름을 말해주세요.
            </p>
            <button
                onClick={onClickVoiceButton}
                className={`flex justify-center items-center w-[100px] h-[100px] border-none rounded-[50%] ${
                    listening ? "bg-[#4caf50]" : "bg-[#f0f0f0]"
                } cursor-pointer`}
            >
                <img
                    src={MicImage}
                    alt="마이크 이미지"
                    style={{
                        height: "50px",
                        filter: listening ? "brightness(0) invert(1)" : "none"
                    }}
                />
            </button>
            <p
                className={`mt-4 font-bold ${
                    listening ? "text-[#4caf50]" : "text-[#333]"
                }`}
            >
                {listening ? "음성인식 중..." : "음성인식 시작"}
            </p>
            {transcript && !listening && (
                <div>
                    <div className="flex mt-4 justify-center items-center">
                        <p>{getSeachText(transcript)}</p>
                        <div className="flex space-x-1 ml-2">
                            <span className="animate-pulse w-1 h-1 bg-gray-500 rounded-full inline-block"></span>
                            <span
                                className="animate-pulse w-1 h-1 bg-gray-500 rounded-full inline-block"
                                style={{ animationDelay: "200ms" }}
                            ></span>
                            <span
                                className="animate-pulse w-1 h-1 bg-gray-500 rounded-full inline-block"
                                style={{ animationDelay: "400ms" }}
                            ></span>
                        </div>
                    </div>
                    {searchResults.length > 0 ? (
                        <div style={{ width: "100%", marginTop: "2rem" }}>
                            <h2 className="text-center mb-4 font-bold">
                                다음과 같은 메뉴들을 발견했어요!
                            </h2>
                            <VoiceSearchedMenuList
                                items={searchResults.map(
                                    (result) => result.item
                                )}
                                handleMenuItemClick={handleMenuItemClick}
                                selectedItems={selectedMenuItems}
                            />
                        </div>
                    ) : (
                        <div>
                            <p className="mt-8 text-center font-bold">
                                검색 결과가 없습니다. 이런 메뉴는 어때요?
                            </p>
                            <VoiceSearchedMenuList
                                items={recommendedMenu.map(
                                    (result) => result.item
                                )}
                                handleMenuItemClick={handleMenuItemClick}
                                selectedItems={selectedMenuItems}
                            />
                        </div>
                    )}
                </div>
            )}
            {/** 아래부터 새로 추가 */}
            <div className="max-w-screen-sm fixed bottom-0 left-2/1 p-4 flex w-full h-[150px] justify-around bg-white">
                <div className="mr-3 flex flex-col w-[280px]">
                    <Button
                        variant="secondary"
                        className="mb-3 h-[70px] text-lg"
                        onClick={handleAddShoppingCart}
                    >
                        장바구니에 넣기
                    </Button>
                    <Button
                        variant="secondary"
                        className="h-[70px] text-lg"
                        onClick={() => navigate("/menus")}
                    >
                        처음으로
                    </Button>
                </div>
                <div className="grow">
                    <Button
                        className="w-full h-full bg-mc_yellow hover:bg-mc_yellow text-lg"
                        onClick={handleQuickOrder}
                    >
                        바로 결제하기
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Voice;
