import React from 'react';    
import {CardMedia,Card,CardContent} from '@mui/material';

interface NewsCardProps {
  title: string;
  imageUrl: string; 
}

const NewsCard: React.FC<NewsCardProps> = ({ title, imageUrl }) => {  
  return (  
    <>
    <Card>
      <CardMedia component="img" height="140" image={imageUrl} alt={title} />
      <CardContent>
        <h4>
          {title}
        </h4> 
      </CardContent>
    </Card>   
    </>
  );
}; 

export default NewsCard;
