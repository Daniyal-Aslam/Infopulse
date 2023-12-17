import React from 'react';
import { Chip } from '@mui/material'; 

interface CategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSortLast7Days?: () => void;
  isSortingLast7Days: boolean; 
}

const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  onCategoryChange,
  onSortLast7Days,
  isSortingLast7Days, 
}) => {
  const categories = ['Apple', 'Meta', 'Netflix', 'Google', 'Twitter', 'Tesla'];

  return (
    <div>
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          color={selectedCategory === category ? 'primary' : 'default'}
          onClick={() => onCategoryChange(category)}
          variant="outlined"
          style={{ cursor: 'pointer', marginRight: '8px' }}
        />
      ))}
      {!isSortingLast7Days && (
        <Chip
          label="Sort by last 7 days"
          color="primary"
          onClick={onSortLast7Days}
          variant="outlined"
          style={{ cursor: 'pointer', marginRight: '8px' }}
        />
      )} 
    </div>
  );
};

export default Categories;
