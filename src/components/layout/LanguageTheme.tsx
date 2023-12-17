import React from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface LanguageThemeProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageTheme: React.FC<LanguageThemeProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const languages = ['en', 'ar'];  

  const handleLanguageChange = (
    event: SelectChangeEvent<string>
  ) => {
    onLanguageChange(event.target.value as string);
  };
 

  return ( 
      <FormControl>
        <InputLabel id="language-select-label">
         Language </InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={selectedLanguage}
          label="Language"
          onChange={handleLanguageChange}
        >
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl> 
  );
};

export default LanguageTheme;
