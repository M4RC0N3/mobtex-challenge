import { useEffect, useState } from "react";
import axios from "axios";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface itemType{
  img: string;
  name: string;
  id: number;
}

const App = () =>{
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([])
  const [videoId, setVideoId] = useState('');
  const loadData = async () => {
    try{
      const result = await axios.get("https://app.olimpiadas.app/teste");
      setData(result.data.data);
    }
    catch(err){
      alert(err)
    }
  };

  window.addEventListener('load',async()=>{
    loadData();
  }) 
  useEffect(()=>{
    data.forEach((item: itemType, index:number)=>{
      console.log(item);
      
      item.id = index;
      item.name = 'Image '+index;
      if(item.img.substr(12, 7) === 'youtube'){
        setVideoId(item.img.substr(30));
        item.img = `https://img.youtube.com/vi/${videoId}/default.jpg?w=248&fit=crop&auto=format`
      }
    });
    setNewData(data);
    
  },[data]);

  function Image({ src, alt } : { src:string, alt: string}) {
    const [loaded, setLoaded] = useState(true);

    return (
      <>
        {
          loaded ? (
            <img
              src={`${src}?w=248&fit=crop&auto=format`}
              srcSet={`${src}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={alt}
              loading="lazy"
              onError={() => setLoaded(false)}
            />
          ) 
          :  (
            <p style={{textAlign: 'center', fontWeight: 'bold', color: '#480808'}}>Erro ao carregar a imagem!</p>
          )
        }
      </>
    );
  }

  return (
    <main>
      <ImageList gap={24} sx={{mb:8, gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr)) !important'}}>
        {newData.map((item: itemType, index:number) => (
          <Card key={index} style={{ backgroundColor: '#959595', height: '100%' }}>
            <ImageListItem key={index} sx={{ height: 'auto !important;', width: '100% !important' }}  >
              <Image src={item.img} alt={item.name} />
              <CardContent>
                  <ImageListItemBar position="below" title={item.name} />
              </CardContent>
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </main>
  );
}

export default App;
