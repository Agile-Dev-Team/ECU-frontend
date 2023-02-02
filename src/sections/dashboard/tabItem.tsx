import { FC } from 'react'
import { styled } from '@mui/material/styles';
import { Typography, Stack, Box, Card, CardActionArea, CardContent } from '@mui/material';

// ----------------------------------------------------------------------
const ContentStyle = styled('div')(({ theme }) => ({
    textAlign: 'center',
    "& .card":{
        padding:'auto',
        "& .title":{
            fontWeight:500,
            padding:0,
            paddingTop:5,
            margin:0,
            "& span":{
                fontSize:'10px',
                marginLeft:5
            }
        }
    }
}));

interface TabItemType  {
    index: string;
    title: string;
    titleInfo: string;
    description: string;
    active:boolean;
}
export const TabItem : FC<TabItemType> = (props:any) => {
    const {index, title, titleInfo, description, active} = props;

    return (
        <ContentStyle>
            <Card className='card' sx={active ?{backgroundColor:'primary.main'}:{}}>
                <CardActionArea>
                    <CardContent>
                        <Stack direction="row" justifyContent={{sm:'flex-start', lg:'flex-start'}} sx={{mb:{lg:1}}}>
                            <Box 
                                sx={{
                                    borderRadius:'50%', 
                                    display:'flex', 
                                    justifyContent:'center', 
                                    alignItems:'center', 
                                    width:{xs:'30px', md:'40px'},
                                    height:{xs:'30px', md:'40px'},
                                    backgroundColor:'primary.main',
                                    mr:2,
                                    color:'white !important',
                                    border:'2px solid white'
                                }}>
                                {index}.
                            </Box>
                            <Typography className='title' sx={{fontSize:{sm:'16px', md:'22px'}}}>{title}<span>{titleInfo}</span></Typography>
                        </Stack>
                        <Typography textAlign='left' variant='body2'>
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            
            </Card>
        </ContentStyle>

    );
}
