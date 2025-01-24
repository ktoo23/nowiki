import { getTasteLabel, LabelType } from '@/utils/taste';
import { tastes } from '../../assets/data/category.json';

type Props = {
  filters: {
    categoryId: string;
    tasteId: string;
  },
  onTasteChange: (tasteId: string) => void;
}

const TasteFilter = ({ filters, onTasteChange}: Props) => {
  return (
    <nav className="flex justify-around h-10 text-lg">
      <h2 className='hidden'>햄버거 맛 카테고리</h2>
      <div
        className={
          filters.tasteId === "" ? "text-mc_yellow font-bold" : undefined
        }
      >
        <button
          onClick={() =>
           onTasteChange("")
          }
        >
          전체
        </button>
      </div>
      {tastes.map((taste) => (
        <div
          key={taste.id}
          className={
            filters.tasteId === taste.id
              ? "text-mc_yellow font-bold"
              : undefined
          }
        >
          <button onClick={() => onTasteChange(taste.id)}>
            {getTasteLabel(taste.name as keyof LabelType)}
          </button>
        </div>
      ))}
    </nav>
  )
}

export default TasteFilter;