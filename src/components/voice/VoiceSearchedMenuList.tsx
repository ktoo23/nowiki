import { MenuItem } from '@/types/menu.interface'

type VoiceSearchedMenuListProps = {
	items:MenuItem[]
	handleMenuItemClick: (item: MenuItem) => void
	selectedItems: MenuItem[]
}

const VoiceSearchedMenuList = ({ items, handleMenuItemClick, selectedItems }: VoiceSearchedMenuListProps) => {
    return (
        <ul className='grid grid-cols-2 gap-4 sm:gap-6'>
            {items.map((item) => {
                const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id)
                return (
                    <li
                        key={item.id}
                        className={`bg-[#F8F8F8] rounded-[10px] text-center cursor-pointer overflow-hidden ${
                            isSelected ? 'ring-2 ring-yellow-400' : ''
                        }`}
                        onClick={() => handleMenuItemClick(item)}
                    >
                        <div className='mb-2'>
                            <img
                                src={item.image_url}
                                alt={item.name}
                                className='block w-full h-auto rounded-t-[10px]'
                            />
                        </div>
                        <strong className='block mb-2 text-md sm:text-lg'>{item.name}</strong>
                        <p className='text-sm p-3'>{item.description}</p>
                        <p className='mb-2 sm:text-lg font-semibold'>
                            {Intl.NumberFormat().format(item.price)}원
                        </p>
                    </li>
                )
            })}
        </ul>
    )
}

export default VoiceSearchedMenuList
